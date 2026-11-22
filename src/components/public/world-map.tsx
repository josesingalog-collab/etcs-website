"use client";

import { useEffect, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";

type Country = { id?: string };
type Countries = { features: Country[] };

const WIDTH = 840;
const HEIGHT = 460;
const PRESENCE = new Set(["180", "250"]);
const MARKERS: [number, number][] = [
  [15.31, -4.32],
  [2.35, 48.85],
];

type Bounds = { x0: number; y0: number; x1: number; y1: number };
type Shape = { d: string; present: boolean; id: string; bounds: Bounds | null };

function starPoints(cx: number, cy: number, r: number): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.42;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return points.join(" ");
}

/** Drapeau de la RDC dessiné dans le repère du pays (bleu ciel, étoile jaune, bande rouge à liseré jaune). */
function FlagRDC({ bounds }: { bounds: Bounds }) {
  const w = bounds.x1 - bounds.x0;
  const h = bounds.y1 - bounds.y0;
  const cx = (bounds.x0 + bounds.x1) / 2;
  const cy = (bounds.y0 + bounds.y1) / 2;
  const angle = (-Math.atan2(h, w) * 180) / Math.PI;
  const length = Math.hypot(w, h) * 1.6;
  return (
    <>
      <rect x={bounds.x0} y={bounds.y0} width={w} height={h} fill="#007FFF" />
      <g transform={`rotate(${angle.toFixed(2)} ${cx.toFixed(2)} ${cy.toFixed(2)})`}>
        <rect x={cx - length / 2} y={cy - h * 0.21} width={length} height={h * 0.42} fill="#F7D618" />
        <rect x={cx - length / 2} y={cy - h * 0.14} width={length} height={h * 0.28} fill="#CE1021" />
      </g>
      <polygon points={starPoints(bounds.x0 + w * 0.2, bounds.y0 + h * 0.3, h * 0.14)} fill="#F7D618" />
    </>
  );
}

/** Drapeau de la France (trois bandes verticales) dans le repère du pays. */
function FlagFrance({ bounds }: { bounds: Bounds }) {
  const w = (bounds.x1 - bounds.x0) / 3;
  const h = bounds.y1 - bounds.y0;
  return (
    <>
      <rect x={bounds.x0} y={bounds.y0} width={w} height={h} fill="#0055A4" />
      <rect x={bounds.x0 + w} y={bounds.y0} width={w} height={h} fill="#FFFFFF" />
      <rect x={bounds.x0 + 2 * w} y={bounds.y0} width={w} height={h} fill="#EF4135" />
    </>
  );
}

export function WorldMap() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    let alive = true;
    fetch("/world-110m.json")
      .then((res) => res.json())
      .then((topo: unknown) => {
        if (!alive) return;
        const topoObject = topo as { objects: { countries: unknown } };
        const collection = feature(topoObject as never, topoObject.objects.countries as never) as unknown as Countries;
        const projection = geoNaturalEarth1();
        projection.fitExtent(
          [
            [4, 4],
            [WIDTH - 4, HEIGHT - 4],
          ],
          collection as never,
        );
        const pathGen = geoPath(projection);
        setShapes(
          collection.features.map((country) => {
            const id = String(country.id ?? "");
            const bounds = PRESENCE.has(id) ? pathGen.bounds(country as never) : null;
            return {
              d: pathGen(country as never) ?? "",
              present: PRESENCE.has(id),
              id,
              bounds: bounds ? { x0: bounds[0][0], y0: bounds[0][1], x1: bounds[1][0], y1: bounds[1][1] } : null,
            };
          }),
        );
        setMarkers(
          MARKERS.map(([lon, lat]) => {
            const point = projection([lon, lat]);
            return { x: point?.[0] ?? 0, y: point?.[1] ?? 0 };
          }),
        );
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Carte du monde — présence de E.T.C.S Sarl en République démocratique du Congo et en France"
      className="h-auto w-full"
    >
      {shapes
        .filter((shape) => !shape.present)
        .map((shape, index) => (
          <path key={`c-${index}`} d={shape.d} className="fill-slate-300/80" stroke="#184a8b" strokeWidth={0.5} />
        ))}
      {shapes
        .filter((shape) => shape.present && shape.d && shape.bounds)
        .map((shape) => (
          <g key={`flag-${shape.id}`}>
            <clipPath id={`clip-${shape.id}`}>
              <path d={shape.d} />
            </clipPath>
            <g clipPath={`url(#clip-${shape.id})`}>{shape.id === "180" ? <FlagRDC bounds={shape.bounds!} /> : <FlagFrance bounds={shape.bounds!} />}</g>
            <path d={shape.d} fill="none" stroke="#031f73" strokeWidth={0.9} className="transition-all duration-300 hover:stroke-royal" />
          </g>
        ))}
      {markers.map((marker, index) => (
        <g key={`m-${index}`} transform={`translate(${marker.x.toFixed(2)},${marker.y.toFixed(2)})`}>
          <circle r="20" fill="#79caf1" opacity="0.3">
            <animate attributeName="r" values="14;30;14" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0.05;0.35" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle r="9" fill="#ffffff" stroke="#031f73" strokeWidth="2.5" />
        </g>
      ))}
    </svg>
  );
}
