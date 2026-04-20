import type { Locale } from "@/hooks/use-locale";

export const SUPPORTED_LOCALES: Locale[] = ["en", "vi", "ja"];

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "vi" || value === "ja";
}

export function getCookieLocale(cookieString: string): Locale | null {
  const match = cookieString.match(new RegExp("(^| )NEXT_LOCALE=([^;]+)"));
  const locale = match?.[2];

  return isSupportedLocale(locale) ? locale : null;
}

export function getBrowserLocale(
  languages?: readonly string[] | null,
  fallbackLanguage?: string,
): Locale {
  const candidates = [...(languages ?? []), fallbackLanguage].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const lower = candidate.toLowerCase();

    if (lower.startsWith("vi")) return "vi";
    if (lower.startsWith("ja")) return "ja";
    if (lower.startsWith("en")) return "en";
  }

  return "en";
}

export function getPreferredClientLocale(): Locale {
  const cookieLocale = getCookieLocale(document.cookie);

  if (cookieLocale) {
    return cookieLocale;
  }

  const locale = getBrowserLocale(navigator.languages, navigator.language);
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
  return locale;
}
