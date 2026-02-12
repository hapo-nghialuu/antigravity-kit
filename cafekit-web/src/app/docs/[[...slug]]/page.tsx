import { notFound } from 'next/navigation';
import { getMDXContent, getMDXFiles, extractHeadings, type MDXContent } from '@/lib/mdx';
import { TableOfContents, TOCHeading } from '@/components/docs/toc';
import { Breadcrumbs } from '@/components/docs/breadcrumbs';
import { DocsPager } from '@/components/docs/pager';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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

  // Slug from URL is clean (e.g. ['getting-started'])
  const mdxSlug = (!slug || slug.length === 0)
    ? 'index'
    : slug.join('/');

  // Construct full path relative to content directory
  // content/docs/{locale}/{mdxSlug}
  const fullPath = `docs/${locale}/${mdxSlug}`;

  return { locale, fullPath, mdxSlug };
}

// Helper to resolve MDX path (handles both file.mdx and folder/index.mdx)
async function resolveMDXPath(fullPath: string): Promise<string | null> {
  // Try direct file path first
  let mdxContent = await getMDXContent(fullPath);
  if (mdxContent) {
    return fullPath;
  }

  // Try as directory with index.mdx
  const indexPath = `${fullPath}/index`;
  mdxContent = await getMDXContent(indexPath);
  if (mdxContent) {
    return indexPath;
  }

  // Fallback to English if requested locale missing? 
  // For strict cookie implementation, maybe we want fallback. 
  // Let's keep it strict for now or add fallback logic if desired.

  return null;
}

// Generate metadata from frontmatter
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { fullPath, mdxSlug } = await getRouteInfo(slug);
  let resolvedPath = await resolveMDXPath(fullPath);

  // Fallback to EN if VI content doesn't exist (same logic as DocPage)
  if (!resolvedPath) {
    const fallbackPath = `docs/en/${mdxSlug}`;
    resolvedPath = await resolveMDXPath(fallbackPath);
  }

  if (!resolvedPath) {
    return {
      title: 'Not Found',
      description: 'Page not found',
    };
  }

  const mdxContent = await getMDXContent(resolvedPath);

  if (!mdxContent) {
    return {
      title: 'Not Found',
      description: 'Page not found',
    };
  }

  return {
    title: `${mdxContent.frontmatter.title} | CafeKit Documentation`,
    description: mdxContent.frontmatter.description || mdxContent.frontmatter.title,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const { locale, fullPath, mdxSlug } = await getRouteInfo(slug);
  const resolvedPath = await resolveMDXPath(fullPath);

  if (!resolvedPath) {
    // Fallback to EN if VI content doesn't exist?
    // Let's try EN path
    const fallbackPath = `docs/en/${mdxSlug}`;
    const fallbackResolved = await resolveMDXPath(fallbackPath);

    if (!fallbackResolved) {
      notFound();
    }
    // Found EN content as fallback
    const mdxContent = await getMDXContent(fallbackResolved);
    if (!mdxContent) notFound();

    return renderDoc(mdxContent, slug, locale, fallbackResolved);
  }

  // Get MDX content
  const mdxContent = await getMDXContent(resolvedPath);

  if (!mdxContent) {
    notFound();
  }

  return renderDoc(mdxContent, slug, locale, resolvedPath);
}

// Get content directory path - use public/content for Vercel compatibility
const contentDir = path.join(process.cwd(), 'public', 'content');

function renderDoc(mdxContent: MDXContent, slug: string[] | undefined, locale: string, resolvedPath: string) {
  // Extract headings for TOC
  const filePath = path.join(contentDir, `${resolvedPath}.mdx`);
  const source = fs.readFileSync(filePath, 'utf-8');
  const { content: rawContent } = matter(source);
  const headings = extractHeadings(rawContent);

  // Filter to only h2 and h3 for TOC
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
