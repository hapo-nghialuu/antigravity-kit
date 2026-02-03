'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDocsConfig } from '@/lib/docs-config';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export default function DocsSidebar({ locale = 'en' }: { locale?: string }) {
    const pathname = usePathname();
    const config = getDocsConfig(locale);

    return (
        <nav className="space-y-6">
            {config.sidebarNav.map((section) => (
                <div key={section.title}>
                    <h3 className="mb-2 px-2 text-sm font-semibold text-foreground tracking-tight flex items-center gap-1">
                        {section.title}
                    </h3>
                    <div className="space-y-1">
                        {section.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "group flex items-center justify-between rounded-md border border-transparent px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                        isActive
                                            ? "bg-primary/10 text-primary hover:bg-primary/15 border-l-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <span>{item.title}</span>
                                    {isActive && <ChevronRight className="h-3 w-3 text-primary" />}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </nav>
    );
}
