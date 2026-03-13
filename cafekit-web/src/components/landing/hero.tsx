"use client";

import Link from "next/link";
import { Coffee, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getLandingTranslations } from "@/lib/landing-translations";

export function Hero() {
  const locale = useLocale();
  const t = getLandingTranslations(locale).hero;
  const [copied, setCopied] = useState(false);
  const installCommand = "npx @haposoft/cafekit";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-secure contexts or older browsers
      const el = document.createElement('textarea');
      el.value = installCommand;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-zinc-900 dark:via-amber-950/20 dark:to-zinc-900">
      <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-20"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-amber-900/10 px-4 py-2 text-sm font-medium text-amber-900 dark:bg-amber-100/10 dark:text-amber-100">
          <Coffee className="h-4 w-4" />
          <span>{t.badge}</span>
        </div>

        <h1 className="mb-6 text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl md:text-8xl">
          <span className="bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-amber-500">
            CafeKit
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl">Spec</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
          {t.subtitle}
        </p>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            <Sparkles className="h-3 w-3" />
            Claude Code
          </span>
          <a
            href="https://antigravity.google/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 transition-colors hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
          >
            <Sparkles className="h-3 w-3" />
            Antigravity
          </a>
        </div>

        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="group relative inline-flex w-full max-w-lg items-center justify-between gap-3 rounded-lg border-2 border-amber-900/20 bg-white/80 px-4 py-3 font-mono text-sm shadow-lg backdrop-blur-sm transition-all hover:border-amber-900/40 dark:border-amber-100/20 dark:bg-zinc-800/80 dark:hover:border-amber-100/40">
            <code className="flex-1 text-left text-zinc-900 dark:text-zinc-100">
              {installCommand}
            </code>
            <button
              onClick={handleCopy}
              aria-label="Copy install command"
              className="rounded-md bg-amber-900/10 px-3 py-1.5 text-xs font-medium text-amber-900 transition-colors hover:bg-amber-900/20 dark:bg-amber-100/10 dark:text-amber-100 dark:hover:bg-amber-100/20"
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/docs"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-amber-900 px-8 font-medium text-white shadow-lg transition-all hover:bg-amber-800 hover:shadow-xl dark:bg-amber-700 dark:hover:bg-amber-600"
          >
            {t.readDocs}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="https://github.com/haposoft/cafekit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-amber-900/20 bg-white/50 px-8 font-medium text-zinc-900 backdrop-blur-sm transition-all hover:border-amber-900/40 hover:bg-white/80 dark:border-amber-100/20 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:border-amber-100/40 dark:hover:bg-zinc-800/80"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
