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

type Shape = { d: string; present: boolean };

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
          collection.features.map((country) => ({
            d: pathGen(country as never) ?? "",
            present: PRESENCE.has(String(country.id ?? "")),
          })),
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
      {shapes.map((shape, index) => (
        <path
          key={index}
          d={shape.d}
          className={shape.present ? "fill-vinci-sky transition-colors duration-300 hover:fill-white" : "fill-slate-300/80"}
          stroke="#184a8b"
          strokeWidth={0.5}
        />
      ))}
      {markers.map((marker, index) => (
        <g key={index} transform={`translate(${marker.x},${marker.y})`}>
          <circle r="14" fill="#79caf1" opacity="0.3">
            <animate attributeName="r" values="8;17;8" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0.05;0.35" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle r="5" fill="#ffffff" stroke="#031f73" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}
