import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocsSidebar from "@/components/docs/sidebar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { isSupportedLocale } from "@/lib/locale-utils";

export const metadata: Metadata = {
  title: "Documentation | CafeKit",
  description: "Complete documentation for CafeKit - Spec-driven development workflow for Claude Code.",
};

export default async function LocaleDocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(16,24,32,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,24,32,.06)_1px,transparent_1px)] [background-size:44px_44px] dark:opacity-[0.12]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 lg:gap-10">
            <aside className="hidden lg:block w-72 shrink-0 sticky top-[64px] h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-2 scrollbar-thin">
              <DocsSidebar locale={locale} />
            </aside>

            <main className="min-w-0 flex-1 py-8 lg:py-10">
              {children}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
