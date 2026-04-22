export type Locale = "en" | "vi" | "ja";

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

export function parseAcceptLanguage(headerValue?: string | null): string[] {
  if (!headerValue) {
    return [];
  }

  return headerValue
    .split(",")
    .map((entry) => entry.trim().split(";")[0])
    .filter(Boolean);
}

export function getPreferredRequestLocale(
  cookieHeader?: string | null,
  acceptLanguageHeader?: string | null,
): Locale {
  const cookieLocale = getCookieLocale(cookieHeader ?? "");

  if (cookieLocale) {
    return cookieLocale;
  }

  return getBrowserLocale(parseAcceptLanguage(acceptLanguageHeader));
}

export function getLocaleFromPathname(pathname?: string | null): Locale | null {
  if (!pathname) {
    return null;
  }

  const [, firstSegment] = pathname.split("/");
  return isSupportedLocale(firstSegment) ? firstSegment : null;
}

export function stripLocalePrefix(pathname?: string | null): string {
  if (!pathname) {
    return "/";
  }

  const locale = getLocaleFromPathname(pathname);

  if (!locale) {
    return pathname || "/";
  }

  const stripped = pathname.slice(`/${locale}`.length);
  return stripped || "/";
}

export function localizeHref(locale: Locale, href: string): string {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (getLocaleFromPathname(href)) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function replacePathLocale(pathname: string, locale: Locale): string {
  const strippedPath = stripLocalePrefix(pathname);
  return localizeHref(locale, strippedPath);
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
