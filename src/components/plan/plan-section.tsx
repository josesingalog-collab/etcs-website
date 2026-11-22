import type { ReactNode } from "react";

const AXIS_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const AXIS_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8"];

function Bubble({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span
      className={`annotation grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[9px] ${className}`}
      style={{ borderColor: "var(--plan-line)", color: "var(--plan-structure)" }}
    >
      {children}
    </span>
  );
}

/** Bulles d'axes horizontales (A, B, C…) */
function AxisRowX() {
  return (
    <div className="pointer-events-none absolute inset-x-6 top-3 hidden justify-between lg:flex" aria-hidden="true">
      {AXIS_LETTERS.map((letter) => <Bubble key={letter}>{letter}</Bubble>)}
    </div>
  );
}

/** Bulles d'axes verticales (1, 2, 3…) */
function AxisColY() {
  return (
    <div className="pointer-events-none absolute inset-y-6 left-3 hidden flex-col justify-between lg:flex" aria-hidden="true">
      {AXIS_NUMBERS.map((number) => <Bubble key={number}>{number}</Bubble>)}
    </div>
  );
}

/** Section « repérée » d'un plan : trame d'axes discrète, bulles d'axes, label technique.
 * variant : "paper" (fond papier calque), "blue" (fond bleu de plan) ou "none". */
export function PlanSection({
  code,
  label,
  variant = "paper",
  className = "",
  children,
}: {
  code: string;
  label: string;
  variant?: "paper" | "blue" | "none";
  className?: string;
  children: ReactNode;
}) {
  const isBlue = variant === "blue";
  return (
    <section
      className={`relative isolate overflow-hidden py-20 ${isBlue ? "text-white" : ""} ${className}`}
      style={{ backgroundColor: variant === "none" ? "transparent" : "var(--plan-paper)" }}
    >
      {variant !== "none" && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--plan-line) 0, var(--plan-line) 1px, transparent 1px, transparent 90px)," +
                "repeating-linear-gradient(90deg, var(--plan-line) 0, var(--plan-line) 1px, transparent 1px, transparent 90px)",
            }}
          />
          <AxisRowX />
          <AxisColY />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-8 lg:px-10">
        <SectionLabel code={code} label={label} light={isBlue} />
        {children}
      </div>
    </section>
  );
}

/** Label technique seul (à placer dans une section personnalisée). */
export function SectionLabel({ code, label, light = false }: { code: string; label: string; light?: boolean }) {
  return (
    <p className="annotation mb-8 text-[10px]" style={{ color: light ? "var(--plan-sky)" : "var(--plan-accent)" }}>
      {code} — {label}
    </p>
  );
}
