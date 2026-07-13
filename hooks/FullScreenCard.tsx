import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FiCheck } from "react-icons/fi";

type FullScreenCardItem = Readonly<{
  title: string;
  items: readonly string[];
}>;

type Props = Readonly<{
  item: FullScreenCardItem;
  index: number;
  activeIndex: number;
  Icon: IconType;
}>;

export const FullScreenCard = ({ item, index, activeIndex, Icon }: Props) => {
  const delta = activeIndex - index;
  const isActive = delta === 0;
  const isPast = delta > 0;
  const isFuture = delta < 0;
  const maxStack = 2;
  const stackDepth = Math.min(delta, maxStack);
  const hidePast = delta > maxStack;
  const cardColors = ["bg-(--color-primary)", "bg-(--color-orange)"];

  const bgColor = cardColors[index % cardColors.length];
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-1 sm:px-2"
      style={{
        zIndex: index, // stack order
        pointerEvents: isActive ? "auto" : "none",
      }}
      initial={false}
      animate={{
        opacity: isFuture ? 0 : hidePast ? 0 : isPast ? 0.72 : 1,
        scale: isPast ? 1 - stackDepth * 0.045 : isActive ? 1 : 0.95,
        y: isPast ? -stackDepth * 18 : isActive ? 0 : 88,
        filter: isActive ? "blur(0px)" : isPast ? "blur(1px)" : "blur(6px)",
      }}
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 22,
        mass: 0.9,
      }}
    >
      <div
        className={`relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/15 p-5 text-white shadow-[0_26px_70px_-30px_rgba(0,0,0,0.6)] sm:w-[96%] sm:p-6 lg:p-7 ${bgColor}`}
      >
        <div className="pointer-events-none absolute -left-16 top-8 h-36 w-36 rounded-full bg-white/10 blur-3xl sm:h-40 sm:w-40" />
        <div className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-black/20 blur-3xl sm:h-48 sm:w-48" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/20" />

        {/* Header */}
        <div className="relative flex items-center justify-between text-[10px] font-semibold tracking-[0.32em] text-white/70">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
            iClinRT
          </span>
        </div>

        {/* Content */}
        <div className="relative mt-5 flex items-start gap-4 sm:gap-5 lg:mt-6 lg:gap-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 shadow-lg shadow-black/10 sm:h-12 sm:w-12">
            <Icon className="h-6 w-6 text-white" />
          </div>

          <div className="min-w-0">
            <p className="text-lg font-semibold leading-tight text-white sm:text-2xl xl:text-[1.85rem]">
              {item.title}
            </p>

            <ul className="mt-3.5 space-y-2.5 text-white/82">
              {item.items.map((point: string) => (
                <li
                  key={point}
                  className="flex gap-2 text-sm leading-5 sm:text-[0.95rem] sm:leading-6"
                >
                  <FiCheck className="mt-1 text-(--color-accent)" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

