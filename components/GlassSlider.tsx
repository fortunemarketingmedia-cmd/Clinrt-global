"use client";

import { cn } from "@/lib/cn";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

export type GlassSliderProps<T> = {
  items: ReadonlyArray<T>;
  renderItem: (item: T, index: number) => ReactNode;
  ariaLabel: string;
  header?: ReactNode;
  className?: string;
  scrollerClassName?: string;
  itemClassName?: string;
  edgeFade?: boolean;
  showControls?: boolean;
  controlsClassName?: string;
  edgeFadeClassName?: string;
  pageSize?: number;
  onActiveChange?: (index: number) => void;
  snapAlign?: "start" | "center";
};

export default function GlassSlider<T>({
  items,
  renderItem,
  ariaLabel,
  header,
  className,
  scrollerClassName,
  itemClassName,
  edgeFade = true,
  showControls = true,
  controlsClassName,
  edgeFadeClassName,
  pageSize,
  onActiveChange,
  snapAlign = "start",
}: GlassSliderProps<T>) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragActive = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateNav = useCallback(() => {
    const slider = scrollerRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    setCanScrollLeft(slider.scrollLeft > 8);
    setCanScrollRight(slider.scrollLeft < maxScroll - 8);

    // NEW: detect center item
    if (onActiveChange) {
      const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
      const sliderItems =
        slider.querySelectorAll<HTMLElement>("[data-slider-item]");
      let closestIndex = 0;
      let closestDistance = Infinity;
      sliderItems.forEach((el, i) => {
        const itemCenter = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - itemCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      onActiveChange(closestIndex);
    }
  }, [onActiveChange]);

  useEffect(() => {
    updateNav();
    const slider = scrollerRef.current;
    if (!slider) return;
    const handleScroll = () => updateNav();
    slider.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      slider.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [updateNav, items.length]);

  const scrollBy = useCallback(
    (direction: -1 | 1) => {
      const slider = scrollerRef.current;
      if (!slider) return;
      let offset = Math.min(slider.clientWidth * 0.85, 420);
      if (pageSize && pageSize > 0) {
        const firstItem =
          slider.querySelector<HTMLElement>("[data-slider-item]");
        const itemWidth = firstItem?.getBoundingClientRect().width ?? 0;
        const styles = window.getComputedStyle(slider);
        const gapValue = parseFloat(styles.columnGap || styles.gap || "0");
        const denom = itemWidth + gapValue;
        const visibleCount =
          denom > 0
            ? Math.max(1, Math.floor((slider.clientWidth + gapValue) / denom))
            : 1;
        const effectivePageSize = Math.min(pageSize, visibleCount);
        const step = denom * effectivePageSize;
        if (step > 0) {
          offset = step;
        }
      }
      slider.scrollBy({ left: offset * direction, behavior: "smooth" });
    },
    [pageSize],
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const slider = scrollerRef.current;
    if (!slider) return;
    dragActive.current = true;
    dragStartX.current = event.clientX;
    dragStartScroll.current = slider.scrollLeft;
    slider.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragActive.current) return;
    const slider = scrollerRef.current;
    if (!slider) return;
    const delta = event.clientX - dragStartX.current;
    slider.scrollLeft = dragStartScroll.current - delta;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragActive.current) return;
    dragActive.current = false;
    const slider = scrollerRef.current;
    if (slider) {
      slider.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollBy(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollBy(-1);
    }
  };

  return (
    <div className={cn("relative", className)}>
      {header && (
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">{header}</div>
        </div>
      )}
      <div className={cn("relative", header ? "mt-6" : "mt-0")}>
        {edgeFade && (
          <>
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 w-16",
                edgeFadeClassName,
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 right-0 w-16 ",
                edgeFadeClassName,
              )}
              aria-hidden="true"
            />
          </>
        )}
        <div
          ref={scrollerRef}
          className={cn(
            "no-scrollbar flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth touch-pan-y select-none cursor-grab active:cursor-grabbing",
            scrollerClassName,
          )}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          role="region"
          aria-label={ariaLabel}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                snapAlign === "center" ? "snap-center" : "snap-start",
                "shrink-0",
                itemClassName,
              )}
              data-slider-item
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
      {showControls && (
        <div className={cn("flex items-center gap-2", controlsClassName)}>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            className="pointer-events-auto group inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-(--primary-color) shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            aria-label="Scroll left"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 transition group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            className="pointer-events-auto group inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-(--primary-color) shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            aria-label="Scroll right"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 transition group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M9 6l6 6-6 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
