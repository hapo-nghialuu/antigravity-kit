"use client";

import Link from "next/link";
import { ArrowRight, FileJson2, FileText, ShieldCheck } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { localizeHref } from "@/lib/locale-utils";

const copy = {
  en: {
    heading: "Real Artifacts after every step",
    subheading:
      "CafeKit leaves files, registries, and receipts so reviewers can see which tasks are ready and which still lack evidence.",
    cta: "Open documentation",
    items: [
      {
        title: "spec.json",
        description: "Machine state for phase, validation status, task registry, and readiness gate.",
      },
      {
        title: "task-R*.md",
        description: "Task packets with objective, scope boundary, completion criteria, and Evidence commands.",
      },
      {
        title: "review + test verdict",
        description: "Structured verdicts that show whether code is ready for merge, Git handoff, or release.",
      },
    ],
  },
  vi: {
    heading: "Artifacts thật sau mỗi bước",
    subheading:
      "CafeKit để lại file, registry và receipt để reviewer biết task nào đã sẵn sàng, task nào còn thiếu evidence.",
    cta: "Mở tài liệu",
    items: [
      {
        title: "spec.json",
        description: "Machine state cho phase, validation status, task registry và readiness gate.",
      },
      {
        title: "task-R*.md",
        description: "Task packet có objective, scope boundary, completion criteria và Evidence commands.",
      },
      {
        title: "review + test verdict",
        description: "Structured verdict cho biết code đã đủ điều kiện merge, Git handoff hoặc release chưa.",
      },
    ],
  },
  ja: {
    heading: "各ステップ後に残る real Artifacts",
    subheading:
      "CafeKit は files、registry、receipt を残し、reviewer が ready な task と evidence 不足の task を判断できるようにします。",
    cta: "ドキュメントを見る",
    items: [
      {
        title: "spec.json",
        description: "phase、validation status、task registry、readiness gate の machine state。",
      },
      {
        title: "task-R*.md",
        description: "objective、scope boundary、completion criteria、Evidence commands を持つ task packet。",
      },
      {
        title: "review + test verdict",
        description: "merge、Git handoff、release の準備ができているかを示す structured verdict。",
      },
    ],
  },
} as const;

const icons = [FileJson2, FileText, ShieldCheck];

export function ArtifactPreview() {
  const locale = useLocale();
  const t = copy[locale] ?? copy.en;

  return (
    <section
      id="artifacts"
      className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(167,197,238,0.1))] py-20 dark:bg-[linear-gradient(180deg,_#101820,_#0E1A21)]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#101820] dark:text-[#F6FAF7] sm:text-4xl">
              {t.heading}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#496158] dark:text-[#CFE1D9]">
              {t.subheading}
            </p>

            <Link
              href={localizeHref(locale, "/docs")}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#006242] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#006242]/18 transition-all hover:bg-[#114734]"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-[#A7C5EE]/16 bg-[#101820] shadow-[0_26px_80px_-36px_rgba(16,24,32,0.5)]">
            <div className="border-b border-[#A7C5EE]/12 px-5 py-4 font-mono text-sm text-[#A7C5EE]">
              specs/meet-transcript-mvp/
            </div>

            <div className="grid gap-4 p-5">
              {t.items.map((item, index) => {
                const Icon = icons[index];

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#A7C5EE]/10 bg-[#13262A]/76 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-[#A7C5EE]/10 p-2">
                        <Icon className="h-5 w-5 text-[#A7C5EE]" />
                      </div>
                      <div className="font-mono text-sm font-semibold text-[#F2EA9D]">
                        {item.title}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#D7E7E0]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
