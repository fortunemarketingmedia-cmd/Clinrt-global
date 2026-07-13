"use client";
import Image from "next/image";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode; // Allow custom content
  title?: string; // Made optional since we might use children
  description?: string; // Made optional
  image?: string; // Made optional for cards without images
  tag?: string;
  imageAlt?: string; // Separate alt text for accessibility
  imagePosition?: "center" | "top" | "bottom"; // Control image positioning
  overlayOpacity?: string; // Customize overlay darkness
  glowColor?: string; // Customize glow color
  glowPosition?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "none";
  contentPosition?: "top" | "center" | "bottom"; // Control where content sits
  contentPadding?: string; // Custom padding
  height?: string; // Custom height
  hoverEffect?: "scale" | "glow" | "both" | "none"; // Control hover effects
  borderColor?: string; // Custom border color
  className?: string;
  contentClassName?: string; // Additional classes for content area
  imageClassName?: string; // Additional classes for image
  overlayClassName?: string; // Additional classes for overlay
  titleClassName?: string; // Add this
  descriptionClassName?: string;
};

export default function GlassCard({
  children,
  title,
  description,
  image,
  tag,
  imageAlt,
  imagePosition = "center",
  overlayOpacity = "bg-black/45",
  glowColor = "bg-emerald-400/20",
  glowPosition = "top-right",
  contentPosition = "bottom",
  contentPadding = "p-6",
  height = "h-72",
  hoverEffect = "both",
  borderColor = "border-white/10",
  className,
  contentClassName,
  imageClassName,
  overlayClassName,
  titleClassName,
  descriptionClassName,
  ...props
}: GlassCardProps) {
  // Position mappings
  const imagePositionClass = {
    top: "object-top",
    center: "object-center",
    bottom: "object-bottom",
  }[imagePosition];

  const contentPositionClass = {
    top: "justify-start",
    center: "justify-center",
    bottom: "justify-end",
  }[contentPosition];

  const glowPositionClass = {
    "top-right": "-top-24 right-0",
    "top-left": "-top-24 left-0",
    "bottom-right": "-bottom-24 right-0",
    "bottom-left": "-bottom-24 left-0",
    none: "hidden",
  }[glowPosition];

  const hoverEffects = {
    scale: hoverEffect === "scale" || hoverEffect === "both",
    glow: hoverEffect === "glow" || hoverEffect === "both",
  };

  return (
    <article
      className={cn(
        "glass-panel group relative overflow-hidden rounded-2xl",
        borderColor,
        height,
        className,
      )}
      {...props}
    >
      {/* Background Image - only if image is provided */}
      {image && (
        <Image
          src={image}
          alt={imageAlt || title || "Card image"}
          fill
          loading="lazy"
          className={cn(
            "object-cover transition duration-500",
            imagePositionClass,
            hoverEffects.scale && "group-hover:scale-105",
            imageClassName,
          )}
        />
      )}

      {/* Dark overlay - conditional opacity */}
      <div
        className={cn(
          "absolute inset-0 transition",
          overlayOpacity,
          hoverEffects.scale && "group-hover:bg-black/25",
          overlayClassName,
        )}
      />

      {/* Glow effect - only if enabled */}
      {hoverEffects.glow && glowPosition !== "none" && (
        <div
          className={cn(
            "absolute h-40 w-40 blur-3xl opacity-0 transition group-hover:opacity-100",
            glowPositionClass,
            glowColor,
          )}
        />
      )}

      {/* Content - flexible based on props */}
      <div
        className={cn(
          "relative z-10 flex h-full flex-col",
          contentPositionClass,
          contentPadding,
          "text-white",
          contentClassName,
        )}
      >
        {children ? (
          // If children are provided, render them directly
          children
        ) : (
          // Otherwise render the default structure
          <>
            {tag && (
              <span className="mb-2 type-h6 uppercase tracking-[0.3em] aa">
                {tag}
              </span>
            )}
            {title && (
              <p className={cn("type-h4 font-semibold", titleClassName)}>
                {title}
              </p>
            )}
            {description && (
              <p
                className={cn(
                  "mt-1 type-h6 text-white/80",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            )}
          </>
        )}
      </div>
    </article>
  );
}
