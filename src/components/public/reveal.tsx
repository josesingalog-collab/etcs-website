"use client";

import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const variants = {
  up: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
} as const;

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: keyof typeof variants;
}) {
  const { hidden, visible } = variants[variant];
  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
