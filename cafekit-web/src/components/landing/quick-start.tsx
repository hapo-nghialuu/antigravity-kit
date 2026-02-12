"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function QuickStart() {
  const [copied, setCopied] = useState(false);

  const codeExample = `# 1. Install CafeKit Spec
npx @haposoft/cafekit-spec

# 2. Initialize project docs (optional but recommended)
/docs init

# 3. Start building features with spec workflow
/spec-init user-authentication
/spec-requirements user-authentication
/spec-design user-authentication
/spec-tasks user-authentication
/spec-impl user-authentication

# 4. Update docs when project changes
/docs update`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-20 dark:from-zinc-900 dark:via-amber-950/20 dark:to-zinc-900">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Get Started in Seconds
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
          Install CafeKit Spec and run your first spec-driven workflow with Claude Code or Antigravity
        </p>

        <div className="relative">
          <div className="overflow-hidden rounded-xl border-2 border-amber-900/20 bg-zinc-900 shadow-2xl dark:border-amber-100/20">
            <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <button
                onClick={handleCopy}
                className="rounded-md bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-600"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="p-6">
              <pre className="font-mono text-sm leading-relaxed">
                {codeExample.split('\n').map((line, i) => (
                  <code key={i} className={line.startsWith('#') ? 'text-zinc-500 block' : 'text-emerald-400 block'}>
                    {line.startsWith('#') ? line : <><span className="text-zinc-500">$ </span>{line}</>}
                  </code>
                ))}
              </pre>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 -z-10 h-24 w-24 rounded-full bg-amber-500/20 blur-3xl"></div>
          <div className="absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-full bg-orange-500/20 blur-3xl"></div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/docs/getting-started/quickstart"
            className="group inline-flex items-center gap-2 text-amber-900 transition-colors hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <span className="font-medium">View full quickstart guide</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
