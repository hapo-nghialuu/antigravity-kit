'use client';

import { usePathname, useRouter } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Languages } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/menu';
import { useEffect, useState } from 'react';
import {
    type Locale,
    getPreferredClientLocale,
    replacePathLocale,
} from '@/lib/locale-utils';

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const [locale, setLocale] = useState<Locale>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const mountTimer = window.setTimeout(() => {
            setMounted(true);
            setLocale(getPreferredClientLocale());
        }, 0);

        return () => window.clearTimeout(mountTimer);
    }, []);

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-md border border-zinc-200 dark:border-zinc-800" />
        );
    }

    const switchLanguage = (target: Locale) => {
        document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`;
        setLocale(target);
        router.push(replacePathLocale(pathname, target));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                aria-label={`Change language. Current: ${locale}`}
                title={locale === 'vi' ? 'Tiếng Việt' : locale === 'ja' ? '日本語' : 'English'}
            >
                <Languages className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLanguage('en')} className={locale === 'en' ? 'bg-accent' : ''}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('vi')} className={locale === 'vi' ? 'bg-accent' : ''}>
                    Tiếng Việt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('ja')} className={locale === 'ja' ? 'bg-accent' : ''}>
                    日本語
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
