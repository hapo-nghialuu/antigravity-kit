import { notFound } from 'next/navigation';
import { getMDXContent, extractHeadings, type MDXContent } from '@/lib/mdx';
import { TableOfContents, TOCHeading } from '@/components/docs/toc';
import { Breadcrumbs } from '@/components/docs/breadcrumbs';
import { DocsPager } from '@/components/docs/pager';
import { cookies } from 'next/headers';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

// Helper to determine locale and content path from slug
async function getRouteInfo(slug?: string[]) {
  let locale = 'en';
  try {
    const cookieStore = await cookies();
    locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  } catch {
    // Cookies not available in static generation, default to 'en'
  }

  const mdxSlug = (!slug || slug.length === 0)
    ? 'index'
    : slug.join('/');

  const fullPath = `docs/${locale}/${mdxSlug}`;

  return { locale, fullPath, mdxSlug };
}

// Helper to resolve MDX path (handles both file.mdx and folder/index.mdx)
async function resolveMDXPath(fullPath: string): Promise<string | null> {
  const mdxContent = await getMDXContent(fullPath);
  if (mdxContent) return fullPath;

  const indexPath = `${fullPath}/index`;
  const indexContent = await getMDXContent(indexPath);
  if (indexContent) return indexPath;

  return null;
}

// Shared helper: resolve doc path with EN fallback
async function resolveDocPath(slug: string[] | undefined): Promise<{ mdxContent: MDXContent; locale: string } | null> {
  const { locale, fullPath, mdxSlug } = await getRouteInfo(slug);
  let resolvedPath = await resolveMDXPath(fullPath);

  if (!resolvedPath) {
    resolvedPath = await resolveMDXPath(`docs/en/${mdxSlug}`);
  }

  if (!resolvedPath) return null;

  const mdxContent = await getMDXContent(resolvedPath);
  if (!mdxContent) return null;

  return { mdxContent, locale };
}

// Generate metadata from frontmatter
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const result = await resolveDocPath(slug);

  if (!result) {
    return { title: 'Not Found', description: 'Page not found' };
  }

  const { mdxContent } = result;
  return {
    title: `${mdxContent.frontmatter.title} | CafeKit Documentation`,
    description: mdxContent.frontmatter.description || mdxContent.frontmatter.title,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await resolveDocPath(slug);

  if (!result) notFound();

  const { mdxContent, locale } = result;
  return renderDoc(mdxContent, slug, locale);
}

function renderDoc(mdxContent: MDXContent, slug: string[] | undefined, locale: string) {
  // Use rawContent already available from getMDXContent — no double file read
  const headings = extractHeadings(mdxContent.rawContent);

  const tocHeadings: TOCHeading[] = headings
    .filter((h) => h.level === 2 || h.level === 3)
    .map((h) => ({
      id: h.id,
      text: h.text,
      level: h.level,
    }));

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <article className="flex-1 min-w-0">
        <Breadcrumbs slug={slug} locale={locale} />

        {/* MDX Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none text-[15px] prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-[1.4em] prose-h3:text-[1.15em] prose-a:font-medium prose-a:text-primary prose-a:underline-offset-4 prose-a:decoration-primary/20 hover:prose-a:decoration-primary prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-border">
          {mdxContent.content}
        </div>

        <DocsPager slug={slug} locale={locale} />
      </article>

      {/* Table of Contents - Right Sidebar */}
      {tocHeadings.length > 0 && (
        <aside className="hidden xl:block w-64 shrink-0 sticky top-[73px] h-[calc(100vh-4.5rem)] overflow-y-auto">
          <TableOfContents headings={tocHeadings} />
        </aside>
      )}
    </div>
  );
}
