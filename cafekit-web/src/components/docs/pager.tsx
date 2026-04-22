import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDocsConfig } from '@/lib/docs-config';
import type { Locale } from '@/lib/locale-utils';
import { cn } from '@/lib/utils';

interface DocsPagerProps {
  slug?: string[];
  locale?: Locale;
}

export function DocsPager({ slug, locale = 'en' }: DocsPagerProps) {
  const pathname = slug ? `/${locale}/docs/${slug.join('/')}` : `/${locale}/docs`;

  // Flatten sidebar config to get linear list of pages
  const config = getDocsConfig(locale);
  const flatNav = config.sidebarNav.flatMap((section) => section.items);

  const activeIndex = flatNav.findIndex((item) => item.href === pathname);

  const prev = activeIndex > 0 ? flatNav[activeIndex - 1] : null;
  const next = activeIndex !== -1 && activeIndex < flatNav.length - 1 ? flatNav[activeIndex + 1] : null;

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between mt-16 pt-8 border-t border-border">
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            "group flex flex-col gap-1 pl-4 pr-6 py-4 rounded-lg border border-border transition-all hover:border-primary/50 hover:bg-muted/30 text-left",
            "w-[48%]"
          )}
        >
          <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </div>
          <div className="font-medium text-foreground">{prev.title}</div>
        </Link>
      ) : (
        <div className="w-[48%]" />
      )}

      {next ? (
        <Link
          href={next.href}
          className={cn(
            "group flex flex-col gap-1 pr-4 pl-6 py-4 rounded-lg border border-border transition-all hover:border-primary/50 hover:bg-muted/30 text-right",
            "w-[48%]"
          )}
        >
          <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
            Next
            <ChevronRight className="h-4 w-4" />
          </div>
          <div className="font-medium text-foreground">{next.title}</div>
        </Link>
      ) : (
        <div className="w-[48%]" />
      )}
    </div>
  );
}
