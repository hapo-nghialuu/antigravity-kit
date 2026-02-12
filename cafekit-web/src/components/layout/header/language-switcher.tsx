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

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const [locale, setLocale] = useState('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Determine initial locale from cookie
        const match = document.cookie.match(new RegExp('(^| )NEXT_LOCALE=([^;]+)'));
        if (match) {
            setLocale(match[2]);
        }
    }, []);

    // Only show on docs pages
    if (!pathname?.startsWith('/docs')) {
        return null;
    }

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <button
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 px-2")}
                disabled
            >
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline-block">English</span>
            </button>
        );
    }

    const switchLanguage = (target: 'en' | 'vi') => {
        // Set cookie
        document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`; // 1 year
        setLocale(target);
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 px-2")}>
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline-block">
                    {locale === 'vi' ? 'Tiếng Việt' : 'English'}
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLanguage('en')} className={locale === 'en' ? 'bg-accent' : ''}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('vi')} className={locale === 'vi' ? 'bg-accent' : ''}>
                    Tiếng Việt
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
