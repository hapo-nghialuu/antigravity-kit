import Link from "next/link";
import MobileMenu from "@/components/layout/header/components/mobile-menu";
import SearchDialog from "@/components/layout/header/components/search-dialog";
import ThemeToggle from "@/components/layout/header/components/theme-toggle";
import DonateDialog from "@/components/layout/header/components/donate-dialog";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:dark:bg-zinc-950/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex h-14 items-center justify-between gap-2 sm:gap-4">
                    {/* Left Section */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-6 flex-1 min-w-0">
                        {/* Mobile Menu */}
                        <div className="lg:hidden">
                            <MobileMenu />
                        </div>

                        {/* Logo - Responsive */}
                        <span className="before:-inset-x-1 before:-rotate-1 relative z-4 before:pointer-events-none before:absolute before:inset-y-0 before:z-4 before:bg-linear-to-r before:from-amber-500 before:via-orange-500 before:to-amber-600 before:opacity-16 before:mix-blend-hard-light font-semibold text-sm sm:text-base truncate">
                            <Link href="/" className="flex items-center gap-2 shrink-0 min-w-0">
                                <span className="hidden sm:inline">CafeKit Spec</span>
                                <span className="sm:hidden">CafeKit</span>
                            </Link>
                        </span>

                        {/* Separator */}
                        <div className="hidden sm:block w-px h-6 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

                        {/* Desktop Nav */}
                        <nav className="hidden sm:flex items-center gap-1 flex-1 min-w-0">
                            <DonateDialog />
                            <Link href="https://github.com/vudovn/cafekit" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="hidden md:flex">
                                    <GithubIcon className="w-4 h-4 mr-2" />
                                    GitHub
                                </Button>
                                <Button variant="outline" size="icon" className="md:hidden">
                                    <GithubIcon className="w-4 h-4" />
                                </Button>
                            </Link>
                        </nav>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* Search - Desktop */}
                        <div className="hidden md:block w-64">
                            <SearchDialog />
                        </div>

                        {/* Mobile Search Button */}
                        <div className="md:hidden">
                            <SearchDialog />
                        </div>

                        {/* Separator */}
                        <div className="hidden md:block w-px h-6 bg-zinc-200 dark:bg-zinc-800" />

                        {/* Theme Toggle */}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}