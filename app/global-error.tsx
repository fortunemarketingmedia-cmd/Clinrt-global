"use client";

import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import Button from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error to your analytics or console in production
  console.error("Global Error Boundary caught:", error);

  return (
    <html>
      <body className="bg-slate-50">
        <div className="flex min-h-screen flex-col items-center justify-center text-center px-6 selection:bg-indigo-100">
          {/* Animated Icon Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-100"
            >
              <Wrench className="w-12 h-12 text-indigo-600" />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              We&apos;ll be back shortly
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
              We&apos;re fine-tuning a few things to make your experience
              better. The application will be up soon—thanks for staying tuned!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              label="Try Reloading"
              onClick={() => reset()}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
            />
          </motion.div>

          {/* Subtle footer or Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center gap-2 text-sm text-slate-400 font-medium uppercase tracking-widest"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            System Optimizing
          </motion.div>
        </div>
      </body>
    </html>
  );
}
