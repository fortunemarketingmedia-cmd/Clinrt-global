'use client';

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { pageTransition } from "@/lib/motion";
import { cn } from "@/lib/cn";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export default function PageTransition({
  children,
  className,
}: PageTransitionProps) {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : pageTransition;

  return (
    <motion.main
      initial="initial"
      animate="animate"
      variants={variants}
      className={cn("min-h-screen", className)}
    >
      {children}
    </motion.main>
  );
}
