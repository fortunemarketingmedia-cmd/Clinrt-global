"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useIntersectionAnimation } from "@/hooks/useIntersectionAnimation";

type RevealVariant = "up" | "left" | "right" | "zoom";

type ScrollRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number | number[];
  rootMargin?: string;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay"?: string;
  "--reveal-duration"?: string;
};

export default function ScrollReveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 700,
  once = true,
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
  style,
  ...props
}: ScrollRevealProps) {
  const { ref, isVisible } = useIntersectionAnimation<HTMLDivElement>({
    threshold,
    rootMargin,
    once,
  });

  const revealStyle: RevealStyle = {
    ...style,
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
  };

  return (
    <div
      ref={ref}
      style={revealStyle}
      className={cn(
        "reveal",
        `reveal-${variant}`,
        isVisible && "is-visible",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
