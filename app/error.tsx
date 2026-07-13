// app/error.tsx
"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <h2 className="text-3xl font-semibold mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-6">
        An unexpected error occurred. Please try again.
      </p>
      <Button label="Try again" onClick={() => reset()} />
    </div>
  );
}
