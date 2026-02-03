'use client';

import { ComponentPropsWithoutRef, ReactNode, createElement, useState, useRef } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type MDXComponentsType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
};

// Custom heading components with anchor links
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Component = ({ children, id, ...props }: ComponentPropsWithoutRef<'h1'>) => {
    const Tag = `h${level}` as const;
    const sizes: Record<number, string> = {
      1: 'text-3xl sm:text-4xl font-bold tracking-tight mb-6 mt-10 scroll-mt-24',
      2: 'text-2xl sm:text-3xl font-bold tracking-tight mb-4 mt-10 scroll-mt-24 pb-2 border-b border-border',
      3: 'text-xl sm:text-2xl font-semibold tracking-tight mb-3 mt-8 scroll-mt-24',
      4: 'text-lg sm:text-xl font-semibold tracking-tight mb-3 mt-6 scroll-mt-24',
      5: 'text-base sm:text-lg font-semibold tracking-tight mb-2 mt-6 scroll-mt-24',
      6: 'text-base font-semibold tracking-tight mb-2 mt-4 scroll-mt-24',
    };

    return createElement(
      Tag,
      {
        id,
        className: cn(sizes[level], "text-foreground group flex items-center"),
        ...props,
      },
      <>
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground no-underline"
            aria-label="Link to this section"
          >
            #
          </a>
        )}
      </>
    );
  };
  Component.displayName = `Heading${level}`;
  return Component;
}

// Callout component for info boxes
interface CalloutProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
}

function Callout({ children, type = 'info' }: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900',
      icon: 'text-blue-600 dark:text-blue-400',
      IconComponent: Info,
    },
    warning: {
      container: 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900',
      icon: 'text-amber-600 dark:text-amber-400',
      IconComponent: AlertTriangle,
    },
    error: {
      container: 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900',
      icon: 'text-red-600 dark:text-red-400',
      IconComponent: AlertCircle,
    },
    success: {
      container: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900',
      icon: 'text-emerald-600 dark:text-emerald-400',
      IconComponent: CheckCircle,
    },
  };

  const style = styles[type];
  const Icon = style.IconComponent;

  return (
    <div className={cn("flex gap-3 p-4 rounded-lg border my-6 text-sm", style.container)}>
      <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", style.icon)} />
      <div className="text-foreground prose-sm [&>p]:mb-0">{children}</div>
    </div>
  );
}

// Custom code block with syntax highlighting (handled by rehype-highlight)
function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
    const preRef = useRef<HTMLPreElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (preRef.current) {
            const text = preRef.current.innerText;
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

  return (
    <div className="relative group my-6">
        <pre
          ref={preRef}
          className="p-4 rounded-lg bg-[#0d1117] dark:bg-[#0d1117] overflow-x-auto border border-border font-mono text-sm leading-relaxed"
          {...props}
        >
          {children}
        </pre>
        <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-md bg-zinc-800/50 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-700 hover:text-zinc-200"
            aria-label="Copy code"
        >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
    </div>
  );
}

function Code({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  return (
    <code className="text-zinc-200 font-mono text-[13px]" {...props}>
      {children}
    </code>
  );
}

// Inline code
function InlineCode({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-[13px] border border-border/50"
      {...props}
    >
      {children}
    </code>
  );
}

// Custom link component
function CustomLink({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const isExternal = href?.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4 decoration-primary/20 hover:decoration-primary transition-all"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href || '#'}
      className="font-medium text-primary underline underline-offset-4 decoration-primary/20 hover:decoration-primary transition-all"
      {...props}
    >
      {children}
    </Link>
  );
}

// Card grid component
interface CardsProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
}

function Cards({ children, cols = 2 }: CardsProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return <div className={cn("grid gap-4 my-6", gridCols[cols])}>{children}</div>;
}

interface CardProps {
  title: string;
  children: ReactNode;
  href?: string;
}

function Card({ title, children, href }: CardProps) {
  const content = (
    <>
      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
          {title}
          {href && <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary">→</span>}
      </h3>
      <p className="text-sm text-muted-foreground">{children}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all no-underline"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
      {content}
    </div>
  );
}

// Export all custom components
export const MDXComponents: MDXComponentsType = {
  // Headings
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  // Text elements
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-6 leading-8 text-muted-foreground/90 text-[16px]" {...props} />
  ),
  a: CustomLink,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-bold text-foreground" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="italic text-muted-foreground" {...props} />
  ),
  // Lists
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-outside mb-6 ml-6 space-y-2 text-muted-foreground/90 leading-7" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-outside mb-6 ml-6 space-y-2 text-muted-foreground/90 leading-7" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="pl-1" {...props} />
  ),
  // Code
  pre: Pre,
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    // If code is inside pre (code block), use Code component
    // Otherwise use InlineCode
    if (props.className?.includes('hljs')) {
      return <Code {...props} />;
    }
    return <InlineCode {...props} />;
  },
  // Blockquote
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="pl-4 border-l-4 border-primary/20 italic text-muted-foreground my-6"
      {...props}
    />
  ),
  // Table
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-muted/50 border-b border-border" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="px-4 py-3 text-left font-semibold text-foreground"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td
      className="px-4 py-3 text-muted-foreground border-b border-border last:border-0"
      {...props}
    />
  ),
  // Horizontal rule
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  // Custom components
  Callout,
  Cards,
  Card,
};
