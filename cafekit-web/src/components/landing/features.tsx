"use client";

import {
  Download,
  FileText,
  Hammer,
  FlaskConical,
  ShieldCheck,
  GitBranch,
  Rocket,
} from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getLandingTranslations } from "@/lib/landing-translations";
import { cn } from "@/lib/utils";

const icons = [
  Download,
  FileText,
  Hammer,
  FlaskConical,
  ShieldCheck,
  GitBranch,
  Rocket,
];

export function Features() {
  const locale = useLocale();
  const t = getLandingTranslations(locale).features;
  const [activeStep, setActiveStep] = useState(0);
  const step = t.steps[activeStep];

  return (
    <section id="workflow" className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(167,197,238,0.12),_rgba(242,234,157,0.08))] py-20 dark:bg-[linear-gradient(180deg,_#101820,_#0E1A21_36%,_#13262A)]">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#101820] dark:text-[#F6FAF7] sm:text-4xl">
          {t.heading}
        </h2>
        <p className="mx-auto mb-14 max-w-3xl text-center text-lg text-[#3A5249] dark:text-[#CFE1D9]">
          {t.subheading}
        </p>

        <div className="overflow-hidden rounded-[32px] border border-[#101820]/8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(167,197,238,0.12))] shadow-[0_26px_80px_-36px_rgba(16,24,32,0.42)] dark:border-[#A7C5EE]/12 dark:bg-[linear-gradient(180deg,_rgba(10,18,25,0.98),_rgba(17,71,52,0.18))]">
          <div className="border-b border-[#101820]/8 bg-[#101820] px-5 py-4 dark:border-[#A7C5EE]/12">
            <div className="flex flex-wrap gap-3">
              {t.steps.map((item, index) => (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition",
                    index === activeStep
                      ? "border-[#A7C5EE]/30 bg-[#1A2A35] text-[#F6FAF7]"
                      : "border-[#A7C5EE]/12 bg-[#0D161C] text-[#8EACD0] hover:border-[#A7C5EE]/24 hover:text-[#DDE9F9]",
                  )}
                >
                  <span>{item.tab}</span>
                  {item.status ? (
                    <span className="rounded-full bg-[#F2EA9D]/18 px-2 py-0.5 text-[11px] text-[#F2EA9D]">
                      {item.status}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#456055] dark:text-[#8EACD0]">
                  {t.workflowLabel}
                </div>
                <h3 className="text-3xl font-bold text-[#101820] dark:text-[#F6FAF7]">
                  {step.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-[#496158] dark:text-[#D7E7E0]">
                  {step.description}
                </p>
              </div>

              <div className="rounded-2xl border border-[#006242]/16 bg-white/84 px-4 py-3 shadow-sm dark:border-[#A7C5EE]/12 dark:bg-[#101820]/58">
                <div className="text-xs uppercase tracking-[0.18em] text-[#456055] dark:text-[#8EACD0]">
                  Active Loop
                </div>
                <div className="mt-1 text-sm font-semibold text-[#101820] dark:text-[#F6FAF7]">
                  install → specs → develop → test → review → git → deploy
                </div>
              </div>
            </div>

            <div className="mb-8 overflow-x-auto rounded-[28px] border border-[#101820]/8 bg-white/70 p-5 dark:border-[#A7C5EE]/12 dark:bg-[#101820]/46">
              <div className="grid min-w-[840px] grid-cols-7 gap-4">
                {t.steps.map((item, index) => {
                  const Icon = icons[index];
                  const active = index === activeStep;

                  return (
                    <button
                      key={item.tab}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className="group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition",
                            active
                              ? "border-[#006242]/20 bg-[#006242] text-white shadow-[0_12px_36px_-18px_rgba(0,98,66,0.7)]"
                              : "border-[#101820]/10 bg-white text-[#101820] group-hover:border-[#006242]/18 dark:border-[#A7C5EE]/12 dark:bg-[#13262A] dark:text-[#DDE9F9]",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        {index < t.steps.length - 1 ? (
                          <div className={cn("h-px flex-1", active ? "bg-[#006242]" : "bg-[#A7C5EE]/28")} />
                        ) : null}
                      </div>
                      <div className="mt-3 text-sm font-semibold text-[#101820] dark:text-[#F6FAF7]">
                        {item.tab}
                      </div>
                      <div className="mt-1 text-sm text-[#4B635A] dark:text-[#CFE1D9]">
                        {item.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[28px] border border-[#101820]/8 bg-white/82 p-6 shadow-[0_20px_54px_-32px_rgba(16,24,32,0.34)] dark:border-[#A7C5EE]/12 dark:bg-[#101820]/52">
                <div className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#456055] dark:text-[#8EACD0]">
                  {t.detailsLabel}
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {step.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl border border-[#006242]/10 bg-[linear-gradient(180deg,_rgba(242,234,157,0.18),_rgba(167,197,238,0.08))] p-4 dark:border-[#A7C5EE]/10 dark:bg-[linear-gradient(180deg,_rgba(17,71,52,0.28),_rgba(16,24,32,0.18))]"
                    >
                      <p className="text-sm leading-7 text-[#274038] dark:text-[#E3EEE8]">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#456055] dark:text-[#8EACD0]">
                  {t.notesLabel}
                </div>
                {step.notes.map((note) => (
                  <div
                    key={note.title}
                    className="rounded-[24px] border border-[#101820]/8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(242,234,157,0.1))] p-5 shadow-[0_16px_40px_-30px_rgba(16,24,32,0.28)] dark:border-[#A7C5EE]/12 dark:bg-[linear-gradient(180deg,_rgba(19,38,42,0.98),_rgba(17,71,52,0.54))]"
                  >
                    <div className="text-sm font-semibold text-[#101820] dark:text-[#F6FAF7]">
                      {note.title}
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[#496158] dark:text-[#D7E7E0]">
                      {note.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
