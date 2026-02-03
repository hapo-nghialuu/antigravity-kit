import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { QuickStart } from "@/components/landing/quick-start";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <QuickStart />
    </div>
  );
}
