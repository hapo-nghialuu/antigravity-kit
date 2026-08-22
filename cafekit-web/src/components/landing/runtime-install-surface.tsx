"use client";

import { BadgeCheck, Bot, FileCode2, Shield, TerminalSquare } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

const copy = {
  en: {
    heading: "What CafeKit installs into your repo",
    subheading:
      "The installer only adds workflow/runtime infrastructure under `.claude` or `.opencode`. Application code stays untouched until you run a workflow for a real feature.",
    items: [
      {
        title: ".claude/skills",
        description: "Skills that create the command surface for question, brainstorm, specs, develop, test, review, docs, sync, and git.",
      },
      {
        title: ".claude/hooks",
        description: "Hooks for state/spec drift reminders, sensitive-read blocking, session context injection, and usage updates.",
      },
      {
        title: ".claude/agents",
        description: "Subagents for inspect, spec, develop, test, review, docs, git, and deployment handoff.",
      },
      {
        title: ".claude/rules",
        description: "Operating rules that keep scope, spec state, quality gates, docs sync, and Git handoff aligned.",
      },
      {
        title: "Your app code",
        description: "Left unchanged during install. CafeKit touches app code only when you assign a clear implementation task.",
      },
    ],
    footer: "No framework lock-in. Re-runs use an ownership manifest to update managed files while preserving your edits.",
  },
  vi: {
    heading: "CafeKit cài gì vào dự án",
    subheading:
      "Bộ cài chỉ thêm hạ tầng vận hành vào `.claude` hoặc `.opencode`. Code ứng dụng không bị chạm cho đến khi bạn chạy quy trình cho một tính năng thật.",
    items: [
      {
        title: ".claude/skills",
        description: "Bộ kỹ năng tạo các lệnh cho question, brainstorm, specs, develop, test, review, docs, sync và git.",
      },
      {
        title: ".claude/hooks",
        description: "Hook nhắc lệch trạng thái hoặc đặc tả, chặn đọc dữ liệu nhạy cảm, nạp ngữ cảnh phiên làm việc và cập nhật mức sử dụng.",
      },
      {
        title: ".claude/agents",
        description: "Agent hỗ trợ chuyên trách inspect, spec, develop, test, review, docs, git và bàn giao triển khai.",
      },
      {
        title: ".claude/rules",
        description: "Quy tắc vận hành giữ phạm vi, trạng thái đặc tả, cổng chất lượng, đồng bộ tài liệu và bàn giao Git đi cùng nhau.",
      },
      {
        title: "Code ứng dụng",
        description: "Được giữ nguyên trong lúc cài đặt. CafeKit chỉ sửa ứng dụng khi bạn giao một tác vụ triển khai rõ ràng.",
      },
    ],
    footer: "Không khóa framework. Khi chạy lại, manifest sở hữu giúp cập nhật file do CafeKit quản lý mà vẫn giữ chỉnh sửa của bạn.",
  },
  ja: {
    heading: "CafeKit が repo にインストールするもの",
    subheading:
      "installer は `.claude` または `.opencode` に workflow/runtime infrastructure だけを追加します。実際の feature workflow を始めるまで app code は変更されません。",
    items: [
      {
        title: ".claude/skills",
        description: "question、brainstorm、specs、develop、test、review、docs、sync、git の command surface を作る skills。",
      },
      {
        title: ".claude/hooks",
        description: "state/spec drift の reminder、sensitive read の block、session context injection、usage update を担う hooks。",
      },
      {
        title: ".claude/agents",
        description: "inspect、spec、develop、test、review、docs、git、deployment handoff を担う subagents。",
      },
      {
        title: ".claude/rules",
        description: "scope、spec state、quality gate、docs sync、Git handoff を揃える operating rules。",
      },
      {
        title: "アプリ本体のコード",
        description: "install 中は変更されません。CafeKit が app code を触るのは、明確な implementation task を渡した後だけです。",
      },
    ],
    footer: "framework lock-in はありません。re-run 時は ownership manifest により managed files を更新しつつ、user edits を preserve します。",
  },
} as const;

const icons = [TerminalSquare, Shield, Bot, BadgeCheck, FileCode2];

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

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
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
