import type { Metadata } from "next";
import DocsSidebar from "@/components/docs/sidebar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
    title: "Documentation | CafeKit Spec",
    description: "Complete documentation for CafeKit Spec - Spec-driven development workflow for Claude Code.",
};

import { cookies } from 'next/headers';

export default async function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let locale = 'vi';
    try {
        const cookieStore = await cookies();
        locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi';
    } catch {
        // Cookies not available in static generation, default to 'vi'
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <Header />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
                <div className="flex gap-8 lg:gap-12">
                    {/* Sidebar Navigation - Desktop */}
                    <aside className="hidden lg:block w-64 shrink-0 sticky top-[57px] h-[calc(100vh-3.5rem)] overflow-y-auto py-8 scrollbar-thin">
                        <DocsSidebar locale={locale} />
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0 py-8 lg:py-10">
                        {children}
                    </main>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
