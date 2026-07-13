"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiDownload,
  FiLoader,
  FiRefreshCw,
} from "react-icons/fi";
import type { Brochure } from "@/data";
import Button from "@/components/ui/Button";

type DownloadState = "idle" | "downloading" | "complete" | "error";

type BrochureAutoDownloadProps = {
  brochure: Brochure;
};

async function downloadBrochureFile(pdfSrc: string, fileName: string) {
  const response = await fetch(pdfSrc);

  if (!response.ok) {
    throw new Error("Failed to fetch brochure.");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1500);
}

export default function BrochureAutoDownload({
  brochure,
}: BrochureAutoDownloadProps) {
  const [state, setState] = useState<DownloadState>("downloading");
  const hasStartedRef = useRef(false);

  async function triggerDownload() {
    setState("downloading");

    try {
      await downloadBrochureFile(brochure.pdfSrc, brochure.fileName);
      setState("complete");
    } catch {
      setState("error");
    }
  }

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    void downloadBrochureFile(brochure.pdfSrc, brochure.fileName)
      .then(() => {
        setState("complete");
      })
      .catch(() => {
        setState("error");
      });
  }, [brochure.fileName, brochure.pdfSrc]);

  return (
    <div className="mt-8 rounded-[1.8rem] border border-white/15 bg-white/10 p-6 text-left shadow-[0_18px_60px_rgba(4,18,33,0.16)] backdrop-blur-xl">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/62">
        Automatic Download
      </p>
      <p className="mt-3 text-xl font-semibold text-white">
        {state === "error"
          ? "Automatic download needs a manual click"
          : "Your brochure is being prepared now"}
      </p>
      <p className="mt-3 text-sm leading-7 text-white/72">
        {state === "complete"
          ? "The PDF should already be on its way. If you did not see it, use the button below to trigger the download again."
          : "Some browsers take a second before the file starts. Keep this page open if the download prompt has not appeared yet."}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.26em]">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/72">
          {state === "downloading" || state === "idle" ? (
            <FiLoader className="h-3.5 w-3.5 animate-spin" />
          ) : state === "complete" ? (
            <FiCheckCircle className="h-3.5 w-3.5" />
          ) : (
            <FiRefreshCw className="h-3.5 w-3.5" />
          )}
          {state === "downloading" || state === "idle"
            ? "Starting download"
            : state === "complete"
              ? "Download started"
              : "Manual retry ready"}
        </span>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-emerald-200">
          {brochure.fileName}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Button
          label={state === "complete" ? "Download Again" : "Download Brochure"}
          icon={FiDownload}
          onClick={() => {
            hasStartedRef.current = true;
            void triggerDownload();
          }}
        />
      </div>
    </div>
  );
}
