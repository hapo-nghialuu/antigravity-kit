"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CafeKitLockup } from "@/components/brand/cafekit-lockup";
import { useLocale } from "@/hooks/use-locale";
import { getSiteShellTranslations } from "@/lib/site-shell-translations";
import MobileMenu from "@/components/layout/header/components/mobile-menu";
import SearchDialog from "@/components/layout/header/components/search-dialog";
import ThemeToggle from "@/components/layout/header/components/theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const locale = useLocale();
    const t = getSiteShellTranslations(locale).header;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex h-16 items-center justify-between gap-3 sm:gap-4">
                    {/* Left Section */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-6 flex-1 min-w-0">
                        {/* Mobile Menu */}
                        <div className="lg:hidden">
                            <MobileMenu />
                        </div>

                        {/* Logo - Responsive */}
                        <div className="relative z-10 flex items-center">
                            <Link href="/" className="transition hover:opacity-95">
                                <CafeKitLockup compact />
                            </Link>
                        </div>

                        {/* Separator */}
                        <div className="hidden sm:block w-px h-6 bg-border shrink-0" />

                        <nav className="hidden sm:flex items-center gap-1 flex-1 min-w-0">
                            {isHome ? (
                                <>
                                    <a href="#workflow" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                                        {t.workflow}
                                    </a>
                                    <a href="#comparison" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                                        {t.whyItWorks}
                                    </a>
                                    <a href="#artifacts" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                                        {t.artifacts}
                                    </a>
                                    <a href="#quickstart" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                                        {t.quickstart}
                                    </a>
                                </>
                            ) : (
                                <>
                                    <Link href="/docs/getting-started/quickstart" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                                        Quickstart
                                    </Link>
                                    <Link href="/docs/reference/commands" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                                        Commands
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {!isHome ? (
                            <>
                                <div className="w-auto md:w-64">
                                    <SearchDialog />
                                </div>
                                <div className="hidden md:block w-px h-6 bg-border" />
                            </>
                        ) : null}

                        {/* Language Switcher */}
                        <LanguageSwitcher />

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {isHome ? (
                            <>
                                <a
                                    href="https://github.com/haposoft/cafekit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-[#006242]/20 hover:text-[#006242]"
                                >
                                    {t.github}
                                </a>
                                <a
                                    href="#quickstart"
                                    className="hidden sm:inline-flex rounded-full bg-[#006242] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#114734]"
                                >
                                    {t.tryQuickstart}
                                </a>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    )
}
