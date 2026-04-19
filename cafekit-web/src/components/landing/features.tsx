"use client";

import { Target, FileText, Rocket, BookOpen } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { getLandingTranslations } from "@/lib/landing-translations";

const icons = [Target, FileText, BookOpen, Rocket];

export function Features() {
  const locale = useLocale();
  const t = getLandingTranslations(locale).features;

  return (
    <section className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(242,234,157,0.12))] py-20 dark:bg-[linear-gradient(180deg,_#101820,_#13262A)]">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#101820] dark:text-[#F6FAF7] sm:text-4xl">
          {t.heading}
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-[#3A5249] dark:text-[#CFE1D9]">
          {t.subheading}
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.items.map((feature, i) => {
            const Icon = icons[i];
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-[#101820]/8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(167,197,238,0.12))] p-8 shadow-[0_18px_50px_-28px_rgba(16,24,32,0.32)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-26px_rgba(0,98,66,0.28)] dark:border-[#A7C5EE]/12 dark:bg-[linear-gradient(180deg,_rgba(18,34,39,0.96),_rgba(17,71,52,0.88))]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(242,234,157,0.28),_transparent_38%),linear-gradient(180deg,_transparent,_rgba(0,98,66,0.04))] opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4 inline-flex rounded-xl bg-[#006242]/10 p-3 ring-1 ring-[#006242]/10 dark:bg-[#A7C5EE]/10 dark:ring-[#A7C5EE]/12">
                    <Icon className="h-6 w-6 text-[#006242] dark:text-[#A7C5EE]" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-[#101820] dark:text-[#F6FAF7]">
                    {feature.title}
                  </h3>

                  <p className="text-[#496158] dark:text-[#D7E7E0]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
