"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getLandingTranslations } from "@/lib/landing-translations";

export function Hero() {
  const locale = useLocale();
  const t = getLandingTranslations(locale).hero;
  const [copied, setCopied] = useState(false);
  const installCommand = "npx @haposoft/cafekit";
  const terminalLines = [
    { kind: "command", text: installCommand },
    { kind: "output", text: "installing Claude Code runtime bundle..." },
    { kind: "success", text: "skills  agents  hooks  statusline" },
    { kind: "command", text: "/hapo:specs Build a meeting transcript extension" },
    { kind: "output", text: "specs/meet-transcript-mvp/spec.json created" },
    { kind: "success", text: "task_registry: 12 pending  |  ready_for_implementation: false" },
    { kind: "command", text: "/hapo:specs --validate meet-transcript-mvp" },
    { kind: "success", text: "validation.status: completed" },
    { kind: "command", text: "/hapo:develop meet-transcript-mvp task-R0-02-auth-setup-dual-mode.md" },
    { kind: "output", text: "quality gate -> build, evidence, review" },
    { kind: "success", text: "docs impact: minor  |  sync task_registry" },
    { kind: "command", text: "/hapo:test --full" },
    { kind: "ghost", text: "Claude available now  |  Antigravity & Cursor coming soon" },
  ] as const;
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
          <div className="mb-6 inline-flex rounded-[28px] border border-black/5 bg-white/88 p-4 shadow-[0_18px_48px_-20px_rgba(16,24,32,0.26)] backdrop-blur dark:border-white/10 dark:bg-white/92">
            <img src="/cafekit_logo.svg" alt="CafeKit" className="h-16 w-auto sm:h-20" />
          </div>

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#006242]/12 bg-white/70 px-4 py-2 text-sm font-medium text-[#114734] shadow-sm backdrop-blur-sm dark:border-[#A7C5EE]/16 dark:bg-[#101820]/50 dark:text-[#A7C5EE]">
            <span>{t.badge}</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-[#101820] dark:text-[#F6FAF7] sm:text-6xl md:text-7xl">
            Claude Code-first
            <span className="mt-2 block bg-gradient-to-r from-[#006242] via-[#114734] to-[#A7C5EE] bg-clip-text text-transparent dark:from-[#F2EA9D] dark:via-[#A7C5EE] dark:to-[#A7C5EE]">
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2EA9D]/60 px-3 py-1 text-xs font-medium text-[#101820] dark:bg-[#F2EA9D]/18 dark:text-[#F2EA9D]">
              Antigravity coming soon
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2EA9D]/60 px-3 py-1 text-xs font-medium text-[#101820] dark:bg-[#F2EA9D]/18 dark:text-[#F2EA9D]">
              Cursor coming soon
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
              href="/docs"
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

        <div className="relative mx-auto w-full max-w-2xl lg:translate-x-4">
          <div className="absolute -right-4 top-8 h-52 w-52 rounded-full bg-[#A7C5EE]/28 blur-3xl" />
          <div className="absolute -left-6 bottom-8 h-44 w-44 rounded-full bg-[#F2EA9D]/22 blur-3xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-[#A7C5EE]/26 bg-[#101820]/96 shadow-[0_24px_80px_-28px_rgba(16,24,32,0.45)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,197,238,0.14),_transparent_30%),linear-gradient(160deg,_rgba(255,255,255,0.04),_rgba(0,98,66,0.08))]" />
            <div className="relative flex items-center justify-between border-b border-[#A7C5EE]/14 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57]" />
                <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e]" />
                <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-sm text-[#A7C5EE]">~ /cafekit-runtime</span>
              <span className="w-[52px]" />
            </div>

            <div className="relative min-h-[350px] px-6 py-7 font-mono text-[15px] leading-7 text-[#F6FAF7]">
              <div className="space-y-3">
                {terminalLines.map((line, index) => (
                  <div key={`${line.text}-${index}`} className="flex items-start gap-3">
                    <span className={line.kind === "command" ? "pt-0.5 text-[#A7C5EE]" : "pt-0.5 text-transparent"}>
                      $
                    </span>
                    <span
                      className={
                        line.kind === "command"
                          ? "font-semibold text-[#F2EA9D]"
                          : line.kind === "success"
                            ? "text-[#6FD4A2]"
                            : line.kind === "ghost"
                              ? "text-[#8EACD0]"
                              : "text-[#D9E6E0]"
                      }
                    >
                      {line.text}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="pt-0.5 text-[#A7C5EE]">$</span>
                  <span className="inline-flex h-6 w-2 rounded-sm bg-[#F2EA9D]/90 align-middle animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-5 -top-5 rounded-2xl border border-[#A7C5EE]/18 bg-[#0E1A21]/92 px-4 py-3 shadow-[0_20px_50px_-24px_rgba(16,24,32,0.6)] backdrop-blur">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#8EACD0]">Active Loop</div>
            <div className="mt-1 text-sm font-semibold text-[#F6FAF7]">specs → develop → test</div>
          </div>

          <div className="absolute -left-5 bottom-8 rounded-2xl border border-[#F2EA9D]/22 bg-[#13262A]/90 px-4 py-3 shadow-[0_20px_50px_-24px_rgba(16,24,32,0.56)] backdrop-blur">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#F2EA9D]">Task Packet</div>
            <div className="mt-1 text-sm font-semibold text-[#F6FAF7]">R0-02 auth setup</div>
            <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-white/8">
              <div className="h-full w-4/5 rounded-full bg-[#6FD4A2]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
