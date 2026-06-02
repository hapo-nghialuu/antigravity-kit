"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale, localizeHref } from "@/lib/locale-utils";
import { getTutorialContent } from "./tutorial-content";
import { TutorialStepPanel } from "./tutorial-step-panel";

type Props = { locale: string };

export function TutorialGuide({ locale }: Props) {
  const loc = (locale === "vi" || locale === "ja" ? locale : "en") as Locale;
  const t = getTutorialContent(loc);
  const [activeStep, setActiveStep] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const totalSteps = t.steps.length;
  const isLast = activeStep === totalSteps - 1;
  const showRecap = activeStep >= totalSteps;

  function goToStep(index: number) {
    setActiveStep(index);
    setRunKey((k) => k + 1);
  }

  return (
    <div className="not-prose space-y-8">
      {/* Page hero */}
      <section className="overflow-hidden rounded-[28px] border border-[#101820]/10 bg-[#101820] p-6 text-white shadow-[0_30px_90px_-50px_rgba(16,24,32,0.85)] sm:p-8">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative">
          <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F2EA9D]">
            {t.eyebrow}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/70">{t.description}</p>
        </div>
      </section>

      {/* Step rail */}
      <div className="flex flex-wrap gap-2">
        {t.steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            onClick={() => goToStep(index)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
              index === activeStep && !showRecap
                ? "border-[#F2EA9D]/30 bg-[#101820] text-[#F2EA9D]"
                : index < activeStep || showRecap
                  ? "border-[#6FD4A2]/25 bg-[#EEF5F1] text-[#006242] dark:bg-[#14252A] dark:text-[#6FD4A2]"
                  : "border-border bg-card text-muted-foreground hover:border-[#006242]/25 hover:text-foreground",
            )}
          >
            {index < activeStep || showRecap ? (
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3" />
                {step.label}
              </span>
            ) : (
              <span>{index + 1}. {step.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* Step panel or recap */}
      {showRecap ? (
        <RecapPanel t={t} loc={loc} onRestart={() => goToStep(0)} />
      ) : (
        <div className="rounded-[24px] border border-border bg-card p-6 sm:p-8">
          <div className="mb-1 font-mono text-xs text-muted-foreground">
            {t.ui.stepWord} {activeStep + 1} / {totalSteps}
          </div>
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {t.steps[activeStep].title}
          </h2>
          <TutorialStepPanel
            step={t.steps[activeStep]}
            ui={t.ui}
            locale={loc}
            runKey={runKey}
          />
        </div>
      )}

      {/* Navigation */}
      {!showRecap && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => goToStep(activeStep - 1)}
            disabled={activeStep === 0}
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-[#006242]/30 disabled:pointer-events-none disabled:opacity-40"
          >
            {t.ui.back}
          </button>
          <button
            type="button"
            onClick={() => isLast ? setActiveStep(totalSteps) : goToStep(activeStep + 1)}
            className="inline-flex items-center gap-2 rounded-full bg-[#006242] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#006242]/18 transition hover:bg-[#114734]"
          >
            {isLast ? t.recap.title.split(" ").slice(0, 3).join(" ") + " →" : t.ui.next}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function RecapPanel({ t, loc, onRestart }: { t: ReturnType<typeof getTutorialContent>; loc: Locale; onRestart: () => void }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="overflow-hidden rounded-[24px] border border-[#006242]/15 bg-[#EEF5F1] p-6 dark:bg-[#14252A]">
        <h2 className="mb-4 text-xl font-semibold text-foreground sm:text-2xl">{t.recap.title}</h2>
        <ul className="space-y-2">
          {t.recap.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#006242] dark:text-[#A7C5EE]" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Glossary */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Glossary</h3>
        <dl className="grid gap-3 sm:grid-cols-2">
          {t.recap.glossary.map(({ term, definition }) => (
            <div key={term} className="rounded-xl border border-border bg-card p-4">
              <dt className="font-mono text-sm font-semibold text-[#006242] dark:text-[#A7C5EE]">{term}</dt>
              <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">{definition}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Next links */}
      <div className="flex flex-wrap gap-3">
        {t.recap.nextLinks.map((link) => (
          <Link
            key={link.href}
            href={localizeHref(loc, link.href)}
            className="inline-flex items-center gap-2 rounded-full border border-[#006242]/20 bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-[#006242]/40 hover:text-[#006242] dark:hover:text-[#A7C5EE]"
          >
            {link.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ))}
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          ↺ Restart tutorial
        </button>
      </div>
    </div>
  );
}
