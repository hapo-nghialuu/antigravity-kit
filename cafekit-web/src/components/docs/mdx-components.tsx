import { ComponentPropsWithoutRef, ReactNode, createElement } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

type MDXComponentsType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
};

// Custom heading components with anchor links
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Component = ({ children, id, ...props }: ComponentPropsWithoutRef<'h1'>) => {
    const Tag = `h${level}` as const;
    const sizes: Record<number, string> = {
      1: 'text-4xl font-bold tracking-tight mb-6 mt-8',
      2: 'text-3xl font-bold tracking-tight mb-5 mt-8',
      3: 'text-2xl font-semibold tracking-tight mb-4 mt-6',
      4: 'text-xl font-semibold tracking-tight mb-3 mt-6',
      5: 'text-lg font-semibold tracking-tight mb-3 mt-6',
      6: 'text-base font-semibold tracking-tight mb-2 mt-4',
    };

    return createElement(
      Tag,
      {
        id,
        className: `${sizes[level]} text-zinc-900 dark:text-zinc-50 scroll-mt-20 group`,
        ...props,
      },
      <>
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 no-underline"
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
      container: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900',
      icon: 'text-blue-600 dark:text-blue-400',
      IconComponent: Info,
    },
    warning: {
      container: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900',
      icon: 'text-yellow-600 dark:text-yellow-400',
      IconComponent: AlertTriangle,
    },
    error: {
      container: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900',
      icon: 'text-red-600 dark:text-red-400',
      IconComponent: AlertCircle,
    },
    success: {
      container: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900',
      icon: 'text-green-600 dark:text-green-400',
      IconComponent: CheckCircle,
    },
  };

  const style = styles[type];
  const Icon = style.IconComponent;

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${style.container} my-6`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.icon}`} />
      <div className="text-sm text-zinc-700 dark:text-zinc-300 prose-sm">{children}</div>
    </div>
  );
}

// Custom code block with syntax highlighting (handled by rehype-highlight)
function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre
      className="p-4 rounded-lg bg-zinc-900 dark:bg-zinc-950 overflow-x-auto border border-zinc-800 my-6 font-mono text-sm"
      {...props}
    >
      {children}
    </pre>
  );
}

function Code({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  return (
    <code className="text-zinc-100 dark:text-zinc-200" {...props}>
      {children}
    </code>
  );
}

// Inline code
function InlineCode({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm border border-zinc-200 dark:border-zinc-700"
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
        className="text-zinc-900 dark:text-zinc-50 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-900 dark:hover:decoration-zinc-50 transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href || '#'}
      className="text-zinc-900 dark:text-zinc-50 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-900 dark:hover:decoration-zinc-50 transition-colors"
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

  return <div className={`grid gap-4 ${gridCols[cols]} my-6`}>{children}</div>;
}

interface CardProps {
  title: string;
  children: ReactNode;
  href?: string;
}

function Card({ title, children, href }: CardProps) {
  const content = (
    <>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{children}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all no-underline"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
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
    <p className="mb-4 leading-7 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  a: CustomLink,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-zinc-900 dark:text-zinc-50" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="italic text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  // Lists
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-7 ml-4" {...props} />
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
      className="pl-4 border-l-4 border-zinc-300 dark:border-zinc-700 italic text-zinc-600 dark:text-zinc-400 my-6"
      {...props}
    />
  ),
  // Table
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-zinc-50 dark:bg-zinc-900" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="px-4 py-2 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td
      className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
      {...props}
    />
  ),
  // Horizontal rule
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="my-8 border-zinc-200 dark:border-zinc-800" {...props} />
  ),
  // Custom components
  Callout,
  Cards,
  Card,
};
