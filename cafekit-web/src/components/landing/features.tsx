"use client";

import { Target, FileText, Rocket, BookOpen } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { getLandingTranslations } from "@/lib/landing-translations";

const icons = [Target, FileText, BookOpen, Rocket];

export function Features() {
  const locale = useLocale();
  const t = getLandingTranslations(locale).features;

  return (
    <section className="bg-white py-20 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {t.heading}
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
          {t.subheading}
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.items.map((feature, i) => {
            const Icon = icons[i];
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-amber-50/30 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:from-zinc-800 dark:to-amber-950/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>

                <div className="relative">
                  <div className="mb-4 inline-flex rounded-xl bg-amber-900/10 p-3 dark:bg-amber-100/10">
                    <Icon className="h-6 w-6 text-amber-900 dark:text-amber-400" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-600 dark:text-zinc-400">
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
