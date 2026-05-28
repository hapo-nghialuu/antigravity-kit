"use client";

import Link from "next/link";
import { CafeKitLockup } from "@/components/brand/cafekit-lockup";
import { useLocale } from "@/hooks/use-locale";
import { localizeHref } from "@/lib/locale-utils";
import { getSiteShellTranslations } from "@/lib/site-shell-translations";

function FooterLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "block text-sm text-muted-foreground transition hover:text-foreground";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

const HAPOSOFT_URLS = {
  en: "https://haposoft.com/en",
  ja: "https://haposoft.com/ja",
  vi: "https://haposoft.com/vi",
};

export default function Footer() {
  const locale = useLocale();
  const t = getSiteShellTranslations(locale).footer;
  const haposoftUrl = HAPOSOFT_URLS[locale] || HAPOSOFT_URLS.en;

  const productLinks = [
    { href: localizeHref(locale, "/docs"), label: t.documentation },
    { href: localizeHref(locale, "/docs/installation"), label: t.installation },
    { href: localizeHref(locale, "/docs/quickstart"), label: t.quickstart },
    { href: localizeHref(locale, "/docs/reference"), label: t.commandReference },
  ];

  const workflowLinks = [
    { href: localizeHref(locale, "/docs/core-workflow"), label: t.coreWorkflow },
    { href: localizeHref(locale, "/docs/workflows"), label: t.specs },
    { href: localizeHref(locale, "/docs/workflows"), label: t.develop },
    { href: localizeHref(locale, "/docs/workflows"), label: t.testReview },
    { href: localizeHref(locale, "/docs/platforms"), label: t.claudeCode },
  ];

  const resourceLinks = [
    { href: "https://github.com/haposoft/cafekit", label: t.github, external: true },
    { href: "https://github.com/haposoft/cafekit/releases", label: t.releases, external: true },
    { href: "https://github.com/haposoft/cafekit/issues", label: t.issues, external: true },
    { href: localizeHref(locale, "/docs/faq"), label: t.faq },
  ];

  return (
    <footer className="mt-auto border-t border-border/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(167,197,238,0.08))] dark:bg-[linear-gradient(180deg,_#0F171D,_#101820)]">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="max-w-sm">
            <Link href={localizeHref(locale, "/")} className="inline-flex">
              <CafeKitLockup compact />
            </Link>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              {t.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={localizeHref(locale, "/docs")}
                className="inline-flex rounded-full bg-[#006242] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#114734]"
              >
                {t.readDocs}
              </Link>
              <a
                href="https://github.com/haposoft/cafekit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-[#006242]/20 hover:text-[#006242]"
              >
                {t.github}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              {t.product}
            </h3>
            <div className="mt-4 space-y-3">
              {productLinks.map((item) => (
                <FooterLink key={item.label} href={item.href} label={item.label} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              {t.workflows}
            </h3>
            <div className="mt-4 space-y-3">
              {workflowLinks.map((item) => (
                <FooterLink key={item.label} href={item.href} label={item.label} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              {t.resources}
            </h3>
            <div className="mt-4 space-y-3">
              {resourceLinks.map((item) => (
                <FooterLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  external={"external" in item ? item.external : false}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/80 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CafeKit by{" "}
            <a
              href={haposoftUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-[#006242] transition-colors hover:text-[#114734] hover:underline"
            >
              Haposoft
            </a>
            . {t.copyright}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/haposoft/cafekit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
              aria-label="GitHub"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
