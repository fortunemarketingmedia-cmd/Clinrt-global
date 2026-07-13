"use client";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { FaqItem } from "./FaqItem";

type ModalProps = {
  onClose: () => void;
  allFaqs: readonly { q: string; a: string }[];
};
export const FaqModal = ({ onClose, allFaqs }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 lg:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0f243a]/40 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 flex h-full max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2.5rem] border border-white/20 bg-white shadow-2xl"
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between border-b border-(--color-orange) px-8 py-6">
          <div>
            <p className="type-h3 font-semibold text-[#0f243a]">
              Frequently Asked Questions
            </p>
            <p className="type-h6 text-gray-500">
              Everything you need to know about ClinRT.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
          <div className="space-y-4">
            {allFaqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-(--color-orange) bg-gray-50 px-8 py-4 text-center">
          <p className="text-sm text-gray-500">
            Still have questions?{" "}
            <span className="font-semibold text-(--color-orange) underline cursor-pointer">
              Contact Support
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
