import Link from "next/link";
import MobileMenu from "@/components/layout/header/components/mobile-menu";
import SearchDialog from "@/components/layout/header/components/search-dialog";
import ThemeToggle from "@/components/layout/header/components/theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex h-14 items-center justify-between gap-2 sm:gap-4">
                    {/* Left Section */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-6 flex-1 min-w-0">
                        {/* Mobile Menu */}
                        <div className="lg:hidden">
                            <MobileMenu />
                        </div>

                        {/* Logo - Responsive */}
                        <div className="relative z-10 flex items-center">
                            <Link
                                href="/"
                                className="flex items-center rounded-2xl border border-black/5 bg-white/90 px-3 py-1.5 shadow-sm ring-1 ring-[#A7C5EE]/20 transition hover:shadow-md dark:border-white/10 dark:bg-white/95"
                            >
                                <img
                                    src="/cafekit_logo.svg"
                                    alt="CafeKit"
                                    className="h-8 w-auto shrink-0"
                                />
                            </Link>
                        </div>

                        {/* Separator */}
                        <div className="hidden sm:block w-px h-6 bg-border shrink-0" />

                        {/* Desktop Nav - reserved for future nav items */}
                        <nav className="hidden sm:flex items-center gap-1 flex-1 min-w-0">
                        </nav>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* Search */}
                        <div className="w-auto md:w-64">
                            <SearchDialog />
                        </div>

                        {/* Separator */}
                        <div className="hidden md:block w-px h-6 bg-border" />

                        {/* Language Switcher */}
                        <LanguageSwitcher />

                        {/* Theme Toggle */}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}
