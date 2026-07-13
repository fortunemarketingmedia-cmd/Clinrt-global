"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

type ClientAvatar = {
  src: string;
  alt?: string;
};

type ClientsProps = {
  avatars: ClientAvatar[];
  label?: string;
  title?: string;
  size?: number;
  className?: string;
};

export default function Clients({
  avatars,
  label = "",
  title = "",
  size = 38,
  className,
}: ClientsProps) {
  const hasText = Boolean(label || title);

  return (
    <div className={cn("flex items-center gap-8", !hasText && "gap-0", className)}>
      {/* Avatar stack */}
      <div className="flex -space-x-3">
        {avatars.map((avatar, index) => (
          <Image
            key={index}
            src={avatar.src}
            alt={avatar.alt ?? "client"}
            width={size}
            height={size}
            loading="lazy"
            className="rounded-full border border-white"
          />
        ))}
      </div>

      {hasText ? (
        <div>
          <p className="type-h6 text-white/70">{label}</p>
          <p className="type-h4 font-semibold">{title}</p>
        </div>
      ) : null}
    </div>
  );
}
