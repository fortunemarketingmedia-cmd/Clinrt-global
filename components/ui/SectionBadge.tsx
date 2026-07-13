"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionBadgeProps = {
  children: ReactNode;
  className?: string;
  dotClassName?: string;
  borderClassName?: string;
};

export default function SectionBadge({
  children,
  className,
  dotClassName,
  borderClassName,
}: SectionBadgeProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm mt-2",
        borderClassName ?? "border border-orange-500",
        className,
      )}
    >
      <span className="relative h-2.5 w-2.5">
        <span
          className={cn(
            "absolute inset-0 rounded-full animate-ping",
            dotClassName ?? "bg-orange-500",
          )}
        />
        <span
          className={cn(
            "absolute inset-0.5 rounded-full",
            dotClassName ?? "bg-orange-500",
          )}
        />
      </span>
      {children}
    </p>
  );
}
