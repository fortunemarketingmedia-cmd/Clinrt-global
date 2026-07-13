import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "@/components/ui/Container";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  fullBleed?: boolean;
};

export default function SectionWrapper({
  children,
  className,
  innerClassName,
  id,
  fullBleed,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-2 sm:py-8 md:py-12", className)}>
      <Container fullBleed={fullBleed} className={innerClassName}>
        {children}
      </Container>
    </section>
  );
}
