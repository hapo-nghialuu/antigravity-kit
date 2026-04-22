import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { OutcomeComparison } from "@/components/landing/outcome-comparison";
import { RuntimeInstallSurface } from "@/components/landing/runtime-install-surface";
import { ArtifactPreview } from "@/components/landing/artifact-preview";
import { QuickStart } from "@/components/landing/quick-start";
import { SUPPORTED_LOCALES, isSupportedLocale } from "@/lib/locale-utils";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen relative bg-background">
      <Header />
      <Hero />
      <Features />
      <OutcomeComparison />
      <RuntimeInstallSurface />
      <QuickStart />
      <ArtifactPreview />
      <Footer />
    </div>
  );
}
