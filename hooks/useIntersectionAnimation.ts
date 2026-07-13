"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

export type UseIntersectionAnimationOptions = {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
  initialVisible?: boolean;
};

export type UseIntersectionAnimationResult<T extends Element> = {
  ref: RefObject<T | null>;
  isVisible: boolean;
};

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const listener = () => callback();
  mediaQuery.addEventListener("change", listener);

  return () => mediaQuery.removeEventListener("change", listener);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useIntersectionAnimation<T extends Element = HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
  once = true,
  disabled = false,
  initialVisible = false,
}: UseIntersectionAnimationOptions = {}): UseIntersectionAnimationResult<T> {
  const ref = useRef<T | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const [hasIntersected, setHasIntersected] = useState(initialVisible);
  const isVisible = disabled || prefersReducedMotion || hasIntersected;

  useEffect(() => {
    if (disabled || prefersReducedMotion) {
      return;
    }

    if (typeof window === "undefined") return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (entry.isIntersecting) {
            setHasIntersected(true);
            observer.unobserve(node);
          }
          return;
        }

        setHasIntersected(entry.isIntersecting);
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [disabled, once, prefersReducedMotion, rootMargin, threshold]);

  return { ref, isVisible };
}
