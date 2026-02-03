'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

    // Observe all headings
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
      <div className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3 text-sm">
        On This Page
      </div>
      <ul className="space-y-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const paddingLeft = `${(heading.level - 2) * 0.75}rem`;

          return (
            <li key={heading.id} style={{ paddingLeft }}>
              <Link
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                className={`
                  block text-xs py-1 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50
                  ${
                    isActive
                      ? 'text-zinc-900 dark:text-zinc-50 font-medium'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }
                `}
              >
                {heading.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
