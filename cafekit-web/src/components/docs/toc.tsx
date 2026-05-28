'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-2">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
        On This Page
      </div>
      <div className="relative pl-0.5">
        {/* Decorative vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        <ul className="space-y-2">
          {headings.map((heading, index) => {
            const isActive = activeId === heading.id;
            // Indent text based on level, but keep border aligned if we want shared line
            // OR indent everything. Let's do indent everything but subtle

            return (
              <li key={`${heading.id}-${index}`}>
                <Link
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                  className={cn(
                    "block text-xs leading-5 py-1.5 transition-colors border-l-2 -ml-px pl-4",
                    isActive
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                  )}
                  style={{
                    paddingLeft: `${(heading.level - 2) * 0.75 + 1}rem`
                  }}
                >
                  {heading.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
