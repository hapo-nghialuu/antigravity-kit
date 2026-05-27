'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDocsConfig, type DocsNavItem } from '@/lib/docs-config';
import type { Locale } from '@/lib/locale-utils';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export default function DocsSidebar({ locale = 'en' }: { locale?: Locale }) {
    const pathname = usePathname();
    const config = getDocsConfig(locale);

    return (
        <nav className="space-y-5 rounded-[26px] border border-border/80 bg-background/78 p-3 shadow-[0_24px_70px_-62px_rgba(16,24,32,0.8)] backdrop-blur">
            {config.sidebarNav.map((section, i) => (
                <div key={`${section.title}-${i}`}>
                    <h3 className="mb-2 px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {section.title}
                    </h3>
                    <div className="space-y-1">
                        {section.items.map((item) => (
                            <SidebarNavItem key={item.href} item={item} pathname={pathname} />
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );
}

function SidebarNavItem({ item, pathname, depth = 0 }: { item: DocsNavItem; pathname: string; depth?: number }) {
    const isActive = pathname === item.href;
    const isBranchActive = item.children?.some((child) => child.href === pathname) ?? false;

    return (
        <div>
            <Link
                href={item.href}
                className={cn(
                    "group flex items-center justify-between rounded-xl border border-transparent font-medium transition hover:bg-muted hover:text-foreground",
                    depth ? "px-3 py-1.5 text-[13px]" : "px-3 py-2 text-sm",
                    isActive
                        ? "border-[#006242]/20 bg-[#EEF5F1] text-[#006242] hover:bg-[#EEF5F1] dark:bg-[#14252A] dark:text-[#A7C5EE]"
                        : isBranchActive ? "text-foreground" : "text-muted-foreground"
                )}
            >
                <span className="min-w-0 truncate">{item.title}</span>
                {isActive && <ChevronRight className="h-3 w-3 text-primary" />}
            </Link>
            {item.children ? (
                <div className="ml-3 mt-1 space-y-1 border-l border-border/80 pl-3">
                    {item.children.map((child) => (
                        <SidebarNavItem key={child.href} item={child} pathname={pathname} depth={depth + 1} />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
