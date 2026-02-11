import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/docs/mdx-components';
import { fileURLToPath } from 'url';

// Get the directory where this file is located
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Traverse up to find content directory (works in both dev and production)
const contentDirectory = path.resolve(__dirname, '../../../content');

export interface Frontmatter {
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface MDXContent {
  frontmatter: Frontmatter;
  content: React.ReactElement;
  slug: string;
}

/**
 * Get all MDX files in a directory recursively
 */
export function getMDXFiles(dir: string = 'docs'): string[] {
  const fullPath = path.join(contentDirectory, dir);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files: string[] = [];
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getMDXFiles(entryPath));
    } else if (entry.name.endsWith('.mdx')) {
      // Remove .mdx extension and normalize path
      files.push(entryPath.replace(/\.mdx$/, ''));
    }
  }

  return files;
}

/**
 * Read and parse MDX file content
 */
export async function getMDXContent(slug: string): Promise<MDXContent | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const source = fs.readFileSync(filePath, 'utf-8');
    const { data, content: rawContent } = matter(source);

    const { content } = await compileMDX({
      source: rawContent,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeHighlight,
            rehypeSlug,
            [rehypeAutolinkHeadings, {
              behavior: 'append',
              properties: {
                className: ['anchor'],
              },
            }],
          ],
        },
      },
      components: MDXComponents,
    });

    return {
      frontmatter: data as Frontmatter,
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error reading MDX file: ${slug}`, error);
    return null;
  }
}

/**
 * Get all MDX files with their frontmatter for static generation
 */
export function getAllMDXMetadata(dir: string = 'docs'): Array<{ slug: string; frontmatter: Frontmatter }> {
  const files = getMDXFiles(dir);

  return files.map((file) => {
    const filePath = path.join(contentDirectory, `${file}.mdx`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(source);

    return {
      slug: file,
      frontmatter: data as Frontmatter,
    };
  });
}

/**
 * Extract headings from MDX content for table of contents
 */
export function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  // Remove code blocks to avoid matching headings inside them
  const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ id: string; text: string; level: number }> = [];

  let match;
  while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ id, text, level });
  }

  return headings;
}
