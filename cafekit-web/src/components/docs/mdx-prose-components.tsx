import { ComponentPropsWithoutRef, ReactNode, createElement } from 'react';
import Link from 'next/link';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlock } from './code-block';

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Component = ({ children, id, ...props }: ComponentPropsWithoutRef<'h1'>) => {
    const Tag = `h${level}` as const;
    const sizes = {
      1: 'text-3xl sm:text-4xl font-semibold tracking-tight mb-6 mt-10 scroll-mt-24',
      2: 'text-2xl sm:text-3xl font-semibold tracking-tight mb-4 mt-10 scroll-mt-24 pb-2 border-b border-border',
      3: 'text-xl sm:text-2xl font-semibold tracking-tight mb-3 mt-8 scroll-mt-24',
      4: 'text-lg sm:text-xl font-semibold tracking-tight mb-3 mt-6 scroll-mt-24',
      5: 'text-base sm:text-lg font-semibold tracking-tight mb-2 mt-6 scroll-mt-24',
      6: 'text-base font-semibold tracking-tight mb-2 mt-4 scroll-mt-24',
    } satisfies Record<number, string>;

    return createElement(Tag, { id, className: cn(sizes[level], 'text-foreground group flex items-center'), ...props }, (
      <>
        {children}
        {id ? <a href={`#${id}`} className="ml-2 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-foreground no-underline" aria-label="Link to this section">#</a> : null}
      </>
    ));
  };
  Component.displayName = `Heading${level}`;
  return Component;
}

function CustomLink({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const isExternal = href?.startsWith('http');
  const className = 'font-medium text-primary underline underline-offset-4 decoration-primary/20 transition-all hover:decoration-primary';

  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>{children}</a>;
  }

  return <Link href={href || '#'} className={className} {...props}>{children}</Link>;
}

function Callout({ children, type = 'info' }: { children: ReactNode; type?: 'info' | 'warning' | 'error' | 'success' }) {
  const variants = {
    info: ['bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900', 'text-blue-600 dark:text-blue-400', Info],
    warning: ['bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900', 'text-amber-600 dark:text-amber-400', AlertTriangle],
    error: ['bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900', 'text-red-600 dark:text-red-400', AlertCircle],
    success: ['bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900', 'text-emerald-600 dark:text-emerald-400', CheckCircle],
  } as const;
  const [container, iconClass, Icon] = variants[type];

  return (
    <div className={cn('my-6 flex gap-3 rounded-2xl border p-4 text-sm', container)}>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', iconClass)} />
      <div className="text-foreground prose-sm [&>p]:mb-0">{children}</div>
    </div>
  );
}

function Cards({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const gridCols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };
  return <div className={cn('my-6 grid gap-4', gridCols[cols])}>{children}</div>;
}

function Card({ title, children, href }: { title?: string; children: ReactNode; href?: string }) {
  const content = title ? (
    <>
      <h3 className="mb-1 flex items-center gap-2 font-semibold text-foreground transition-colors group-hover:text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{children}</p>
    </>
  ) : children;
  const className = 'group block rounded-2xl border border-border bg-card p-6 text-card-foreground transition-all hover:border-primary/50 hover:shadow-sm no-underline';

  return href ? <Link href={href} className={className}>{content}</Link> : <div className={className}>{content}</div>;
}

export const proseComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className="mb-6 text-[16px] leading-8 text-muted-foreground/90" {...props} />,
  a: CustomLink,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => <strong className="font-semibold text-foreground" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="italic text-muted-foreground" {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="mb-6 ml-6 list-disc space-y-2 text-muted-foreground/90 leading-7" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="mb-6 ml-6 list-decimal space-y-2 text-muted-foreground/90 leading-7" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="pl-1" {...props} />,
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <CodeBlock {...props} />,
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    props.className?.includes('hljs')
      ? <code className="font-mono text-[13px] text-zinc-200" {...props} />
      : <code className="rounded border border-border/50 bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => <blockquote className="my-6 rounded-r-2xl border-l-4 border-primary/25 bg-muted/40 py-3 pl-4 text-muted-foreground" {...props} />,
  table: (props: ComponentPropsWithoutRef<'table'>) => <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-border"><table className="m-0 w-full border-collapse text-sm" {...props} /></div>,
  thead: (props: ComponentPropsWithoutRef<'thead'>) => <thead className="border-b border-border bg-muted/50" {...props} />,
  th: (props: ComponentPropsWithoutRef<'th'>) => <th className="px-4 py-3 text-left font-semibold text-foreground" {...props} />,
  td: (props: ComponentPropsWithoutRef<'td'>) => <td className="border-b border-border px-4 py-3 text-muted-foreground last:border-0" {...props} />,
  hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr className="my-8 border-border" {...props} />,
  Callout,
  Cards,
  Card,
};
