'use client';

import { useEffect, useState } from 'react';

export type Locale = 'en' | 'vi' | 'ja';

export function useLocale(): Locale {
    const [locale, setLocale] = useState<Locale>('en');

    useEffect(() => {
        const updateLocale = () => {
            const match = document.cookie.match(new RegExp('(^| )NEXT_LOCALE=([^;]+)'));
            if (match && ['en', 'vi', 'ja'].includes(match[2])) {
                setLocale(match[2] as Locale);
            }
        };

        updateLocale();
        window.addEventListener('locale-changed', updateLocale);
        return () => window.removeEventListener('locale-changed', updateLocale);
    }, []);

    return locale;
}
