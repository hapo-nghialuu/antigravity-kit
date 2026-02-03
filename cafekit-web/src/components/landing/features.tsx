import { Target, FileText, Rocket } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "6-Phase Workflow",
    description: "From requirements gathering to implementation tracking. A structured process that ensures nothing is missed.",
  },
  {
    icon: FileText,
    title: "Living Documentation",
    description: "Every spec creates documentation that stays with your project. Perfect for team collaboration and maintenance.",
  },
  {
    icon: Rocket,
    title: "AI-Guided Implementation",
    description: "Claude Code guides you through each phase with intelligent suggestions and verification at every step.",
  },
];

export function Features() {
  return (
    <section className="bg-white py-20 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Build features with confidence
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
          CafeKit Spec provides a complete workflow for spec-driven development with Claude Code
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
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
