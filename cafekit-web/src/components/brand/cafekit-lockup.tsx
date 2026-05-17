"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface CafeKitLockupProps {
  className?: string;
  compact?: boolean;
  framed?: boolean;
  showTagline?: boolean;
}

export function CafeKitLockup({
  className,
  compact = false,
  framed = false,
  showTagline = false,
}: CafeKitLockupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center",
        framed &&
          "rounded-[28px] border border-black/5 bg-white/92 shadow-[0_18px_48px_-20px_rgba(16,24,32,0.26)] backdrop-blur dark:border-white/10 dark:bg-white/94",
        compact ? "gap-2.5" : "gap-3.5",
        framed && (compact ? "px-3 py-2" : "px-5 py-4"),
        className,
      )}
    >
      <Image
        src="/cafekit_cup_logo.svg"
        alt="CafeKit cup logo"
        width={compact ? 32 : 56}
        height={compact ? 32 : 56}
        className={cn("w-auto shrink-0", compact ? "h-8" : "h-12 sm:h-14")}
      />

      <div className="min-w-0">
        <div
          className={cn(
            "font-semibold tracking-tight",
            framed ? "text-[#101820]" : "text-foreground dark:text-[#F6FAF7]",
            compact ? "text-lg" : "text-2xl sm:text-[1.95rem]",
          )}
        >
          CafeKit
        </div>
        {showTagline ? (
          <div
            className={cn(
              "font-mono uppercase tracking-[0.22em]",
              framed ? "text-[#006242]" : "text-[#456055] dark:text-[#A7C5EE]",
              compact ? "text-[9px]" : "text-[10px] sm:text-[11px]",
            )}
          >
            Spec-driven runtime
          </div>
        ) : null}
      </div>
    </div>
  );
}
