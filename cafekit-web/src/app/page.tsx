import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { QuickStart } from "@/components/landing/quick-start";
import { LanguageSwitcher } from "@/components/layout/header/language-switcher";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <Hero />
      <Features />
      <QuickStart />
    </div>
  );
}
