"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { CafeKitLockup } from "@/components/brand/cafekit-lockup";
import { useLocale } from "@/hooks/use-locale";
import { localizeHref } from "@/lib/locale-utils";
import { getLandingTranslations } from "@/lib/landing-translations";
import { InteractiveRuntimeTerminal } from "@/components/landing/interactive-runtime-terminal";

export function Hero() {
  const locale = useLocale();
  const t = getLandingTranslations(locale).hero;
  const [copied, setCopied] = useState(false);
  const installCommand = "npx @haposoft/cafekit";
  const runtimeStats = [
    { label: "Spec gates", value: "validate first" },
    { label: "Task state", value: "registry-backed" },
    { label: "Docs", value: "checkpoint per task" },
  ] as const;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = installCommand;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(167,197,238,0.32),_transparent_32%),linear-gradient(135deg,_#FCFCF5_0%,_#F4F8EE_42%,_#EAF4EF_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(167,197,238,0.14),_transparent_28%),linear-gradient(135deg,_#101820_0%,_#0F221F_45%,_#114734_100%)]">
      <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-15" />
      <div className="absolute left-16 top-20 h-64 w-64 rounded-full bg-[#F2EA9D]/35 blur-3xl" />
      <div className="absolute right-10 top-28 h-80 w-80 rounded-full bg-[#A7C5EE]/30 blur-3xl" />
      <div className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-[#006242]/12 blur-3xl dark:bg-[#006242]/20" />

      <div className="relative z-10 mx-auto grid min-h-[88vh] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-10">
        <div className="max-w-2xl">
          <div className="mb-6">
            <CafeKitLockup
              framed
              showTagline
              className="min-w-[220px] sm:min-w-[248px]"
            />
          </div>

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#006242]/12 bg-white/70 px-4 py-2 text-sm font-medium text-[#114734] shadow-sm backdrop-blur-sm dark:border-[#A7C5EE]/16 dark:bg-[#101820]/50 dark:text-[#A7C5EE]">
            <span>{t.badge}</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-[#101820] dark:text-[#F6FAF7] sm:text-6xl md:text-7xl">
            Claude Code-first
            <span className="mt-2 block bg-gradient-to-r from-[#F2EA9D] via-[#006242] to-[#A7C5EE] bg-clip-text text-transparent dark:from-[#F2EA9D] dark:via-[#F6FAF7] dark:to-[#A7C5EE]">
              CafeKit runtime
            </span>
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-[#344A42] dark:text-[#D7E7E0] sm:text-xl">
            {t.subtitle}
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A7C5EE]/40 px-3 py-1 text-xs font-medium text-[#101820] dark:bg-[#A7C5EE]/18 dark:text-[#DDE9F9]">
              <Sparkles className="h-3 w-3" />
              Claude Code available now
            </span>
          </div>

          <div className="mb-10 flex w-full max-w-xl items-center gap-3 rounded-2xl border border-[#006242]/12 bg-white/86 p-3 shadow-xl shadow-[#101820]/8 backdrop-blur-sm dark:border-[#A7C5EE]/12 dark:bg-[#101820]/78">
            <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-xl bg-[#101820] px-4 py-3 font-mono text-sm text-[#F2EA9D]">
              {installCommand}
            </code>
            <button
              onClick={handleCopy}
              aria-label="Copy install command"
              className="shrink-0 rounded-xl bg-[#006242] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#114734]"
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href={localizeHref(locale, "/docs")}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#006242] px-8 font-medium text-white shadow-lg shadow-[#006242]/18 transition-all hover:bg-[#114734] hover:shadow-xl"
            >
              {t.readDocs}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="https://github.com/haposoft/cafekit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[#101820]/12 bg-white/72 px-8 font-medium text-[#101820] backdrop-blur-sm transition-all hover:border-[#006242]/24 hover:bg-white/88 dark:border-[#A7C5EE]/14 dark:bg-[#101820]/55 dark:text-[#F6FAF7] dark:hover:border-[#A7C5EE]/30 dark:hover:bg-[#101820]/72"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
            {runtimeStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#101820]/8 bg-white/76 px-4 py-3 shadow-[0_14px_36px_-24px_rgba(16,24,32,0.28)] backdrop-blur dark:border-[#A7C5EE]/12 dark:bg-[#101820]/44"
              >
                <div className="text-xs uppercase tracking-[0.16em] text-[#456055] dark:text-[#8EACD0]">
                  {item.label}
                </div>
                <div className="mt-1 text-sm font-semibold text-[#101820] dark:text-[#F6FAF7]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <InteractiveRuntimeTerminal />
      </div>
    </section>
  );
}
