import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { docsConfig } from '@/lib/docs-config';

interface BreadcrumbsProps {
  slug?: string[];
}

export function Breadcrumbs({ slug }: BreadcrumbsProps) {
  // Simple breadcrumb logic based on slug
  // For production, you might want to map slugs to titles from config

  const crumbs = [
    { title: 'Docs', href: '/docs' },
  ];

  if (slug) {
      // Logic to find titles could be complex, for now let's use slug parts or look up
      // Flatten config to find titles
      const flatNav = docsConfig.sidebarNav.flatMap(section => section.items);

      let currentPath = '/docs';
      slug.forEach((part, index) => {
          currentPath += `/${part}`;
          // Try to find title in config
          const navItem = flatNav.find(item => item.href === currentPath);
          const title = navItem ? navItem.title : part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');

          crumbs.push({
              title,
              href: currentPath
          });
      });
  } else {
      // Root docs page
      crumbs.push({ title: 'Introduction', href: '/docs' });
  }

  // Remove duplicates if any (e.g. Docs > Introduction might overlap if slug is empty)
  const uniqueCrumbs = crumbs.filter((crumb, index, self) =>
    index === self.findIndex((t) => (
      t.href === crumb.href
    ))
  );

  return (
    <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-4 overflow-hidden whitespace-nowrap mask-fade-right">
      {uniqueCrumbs.map((crumb, index) => {
        const isLast = index === uniqueCrumbs.length - 1;

        return (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />}
            {isLast ? (
              <span className="font-medium text-foreground truncate max-w-[200px]">{crumb.title}</span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-foreground transition-colors truncate max-w-[150px]"
              >
                {crumb.title}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
