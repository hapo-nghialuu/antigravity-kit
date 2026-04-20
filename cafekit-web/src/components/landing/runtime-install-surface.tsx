"use client";

import { BadgeCheck, FileCode2, Shield, TerminalSquare } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

const copy = {
  en: {
    heading: "What gets installed",
    subheading:
      "New users want to know whether CafeKit changes the app or just installs workflow infrastructure. Show that clearly.",
    items: [
      {
        title: ".claude/skills",
        description: "The runtime command surface for specs, develop, test, review, git, and sync.",
      },
      {
        title: ".claude/hooks",
        description: "State reminders, privacy guardrails, and runtime context injection around Claude Code.",
      },
      {
        title: ".claude/rules",
        description: "Execution rules that keep spec state, quality gates, docs sync, and Git handoff aligned.",
      },
      {
        title: "Your app code",
        description: "Untouched until you intentionally enter the spec and task workflow for a real feature.",
      },
    ],
    footer: "No framework lock-in. Works inside an existing repo and tells you what it is doing.",
  },
  vi: {
    heading: "CafeKit cài những gì",
    subheading:
      "Người mới luôn muốn biết CafeKit có sửa app hay chỉ cài workflow infrastructure. Nên nói thật rất rõ.",
    items: [
      {
        title: ".claude/skills",
        description: "Command surface cho specs, develop, test, review, git và sync.",
      },
      {
        title: ".claude/hooks",
        description: "State reminders, privacy guardrails và runtime context injection quanh Claude Code.",
      },
      {
        title: ".claude/rules",
        description: "Rule giữ spec state, quality gate, docs sync và Git handoff đi cùng nhau.",
      },
      {
        title: "Code ứng dụng",
        description: "Không bị đụng tới cho đến khi bạn chủ động chạy workflow spec và task cho một feature thật.",
      },
    ],
    footer: "Không khóa framework. Chạy trong repo sẵn có và nói rõ nó đang làm gì.",
  },
  ja: {
    heading: "何がインストールされるか",
    subheading:
      "新規ユーザーは、CafeKit が app code を変えるのか、workflow infrastructure を入れるだけなのかをまず知りたいです。",
    items: [
      {
        title: ".claude/skills",
        description: "specs、develop、test、review、git、sync の command surface。",
      },
      {
        title: ".claude/hooks",
        description: "state reminder、privacy guardrail、runtime context injection。",
      },
      {
        title: ".claude/rules",
        description: "spec state、quality gate、docs sync、Git handoff を揃える実行ルール。",
      },
      {
        title: "アプリ本体のコード",
        description: "本物の feature で workflow を開始するまで勝手には変更されません。",
      },
    ],
    footer: "framework lock-in はありません。既存 repo の中で動き、何をしているかを明示します。",
  },
} as const;

const icons = [TerminalSquare, Shield, BadgeCheck, FileCode2];

export function RuntimeInstallSurface() {
  const locale = useLocale();
  const t = copy[locale] ?? copy.en;

  return (
    <section
      id="install-surface"
      className="bg-[linear-gradient(180deg,_rgba(242,234,157,0.08),_rgba(255,255,255,0.95))] py-20 dark:bg-[linear-gradient(180deg,_#13262A,_#101820)]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-[#101820] dark:text-[#F6FAF7] sm:text-4xl">
          {t.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-[#496158] dark:text-[#CFE1D9]">
          {t.subheading}
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {t.items.map((item, index) => {
            const Icon = icons[index];

            return (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#101820]/8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(167,197,238,0.1))] p-6 shadow-[0_18px_52px_-34px_rgba(16,24,32,0.3)] dark:border-[#A7C5EE]/10 dark:bg-[linear-gradient(180deg,_rgba(19,38,42,0.98),_rgba(17,71,52,0.52))]"
              >
                <div className="inline-flex rounded-xl bg-[#006242]/10 p-3 dark:bg-[#A7C5EE]/10">
                  <Icon className="h-5 w-5 text-[#006242] dark:text-[#A7C5EE]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#101820] dark:text-[#F6FAF7]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#496158] dark:text-[#D7E7E0]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-[28px] border border-[#006242]/12 bg-white/80 px-6 py-5 text-center text-sm font-medium text-[#274038] shadow-[0_14px_40px_-30px_rgba(0,98,66,0.35)] dark:border-[#6FD4A2]/12 dark:bg-[#101820]/55 dark:text-[#E7F2EC]">
          {t.footer}
        </div>
      </div>
    </section>
  );
}
