import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  fullBleed?: boolean;
};

export default function Container({
  fullBleed,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "section-shell min-w-0",
        fullBleed && "[--container-max:100%] px-0",
        className,
      )}
      {...props}
    />
  );
}
