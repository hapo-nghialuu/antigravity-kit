'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
    type Locale,
    getLocaleFromPathname,
    getPreferredClientLocale,
} from '@/lib/locale-utils';

export function useLocale(): Locale {
    const pathname = usePathname();
    const routeLocale = getLocaleFromPathname(pathname);
    const [locale, setLocale] = useState<Locale>(routeLocale ?? 'en');

    useEffect(() => {
        if (routeLocale) {
            return;
        }

        const localeTimer = window.setTimeout(() => {
            setLocale(getPreferredClientLocale());
        }, 0);

        return () => window.clearTimeout(localeTimer);
    }, [routeLocale]);

    return routeLocale ?? locale;
}
