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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex gap-8 lg:gap-12">
          <aside className="hidden lg:block w-64 shrink-0 sticky top-[57px] h-[calc(100vh-3.5rem)] overflow-y-auto py-8 scrollbar-thin">
            <DocsSidebar locale={locale} />
          </aside>

          <main className="flex-1 min-w-0 py-8 lg:py-10">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
