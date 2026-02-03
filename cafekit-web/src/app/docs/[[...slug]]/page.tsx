import { notFound } from 'next/navigation';
import { getMDXContent, getMDXFiles, extractHeadings } from '@/lib/mdx';
import { TableOfContents, TOCHeading } from '@/components/docs/toc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

// Generate static params for all MDX files
export async function generateStaticParams() {
  const files = getMDXFiles('docs');

  const params = files.map((file) => ({
    slug: file.replace('docs/', '').split('/'),
  }));

  // Add root docs path
  params.push({ slug: undefined });

  return params;
}

// Helper to resolve MDX path (handles both file.mdx and folder/index.mdx)
async function resolveMDXPath(slug: string[] | undefined): Promise<string | null> {
  const basePath = slug ? `docs/${slug.join('/')}` : 'docs/index';

  // Try direct file path first
  let mdxContent = await getMDXContent(basePath);
  if (mdxContent) {
    return basePath;
  }

  // Try as directory with index.mdx
  const indexPath = `${basePath}/index`;
  mdxContent = await getMDXContent(indexPath);
  if (mdxContent) {
    return indexPath;
  }

  return null;
}

// Generate metadata from frontmatter
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = await resolveMDXPath(slug);

  if (!slugPath) {
    return {
      title: 'Not Found',
      description: 'Page not found',
    };
  }

  const mdxContent = await getMDXContent(slugPath);

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
  const slugPath = await resolveMDXPath(slug);

  if (!slugPath) {
    notFound();
  }

  // Get MDX content
  const mdxContent = await getMDXContent(slugPath);

  if (!mdxContent) {
    notFound();
  }

  // Extract headings for TOC
  const filePath = path.join(process.cwd(), 'content', `${slugPath}.mdx`);
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
        {/* Page Header */}
        <div className="mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            {mdxContent.frontmatter.title}
          </h1>
          {mdxContent.frontmatter.description && (
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {mdxContent.frontmatter.description}
            </p>
          )}
        </div>

        {/* MDX Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {mdxContent.content}
        </div>
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
