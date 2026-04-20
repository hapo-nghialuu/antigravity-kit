'use client';

import { useEffect, useState } from 'react';
import { getPreferredClientLocale } from '@/lib/locale-utils';

export type Locale = 'en' | 'vi' | 'ja';

export function useLocale(): Locale {
    const [locale, setLocale] = useState<Locale>('en');

    useEffect(() => {
        const updateLocale = () => {
            setLocale(getPreferredClientLocale());
        };

        updateLocale();
        window.addEventListener('locale-changed', updateLocale);
        return () => window.removeEventListener('locale-changed', updateLocale);
    }, []);

    return locale;
}
