"use client";

import { useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useToggle } from "@/hooks/useToggle";

type Props = { q: string; a: string };

export const FaqItem = ({ q, a }: Props) => {
  const { value: open, toggle } = useToggle(false);
  const id = useId();

  return (
    <motion.div
      layout
      className={`relative rounded-2xl border overflow-hidden backdrop-blur transition
      ${open ? "border-[#0f243a]/60 bg-[#0f243a]/5 shadow-lg" : "border-white/10"}
      hover:border-[#0f243a]/40`}
    >
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <span className="type-h5 font-medium">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex h-9 w-9 items-center justify-center rounded-full border
  ${open ? "bg-[#0f243a] border-[#0f243a] text-white" : "border-white/20"}`}
        >
          {open ? <FiMinus size={20} /> : <FiPlus size={20} />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm text-(--text-description)">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ opacity: open ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl pointer-events-none
        bg-[radial-gradient(circle_at_top,rgba(15,36,58,0.25),transparent_70%)]"
      />
    </motion.div>
  );
};
