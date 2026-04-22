import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPreferredRequestLocale } from '@/lib/locale-utils';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export const dynamic = 'force-dynamic';

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = getPreferredRequestLocale(
    headerStore.get('cookie') ?? cookieStore.toString(),
    headerStore.get('accept-language'),
  );
  const destination = slug?.length ? `/${locale}/docs/${slug.join('/')}` : `/${locale}/docs`;

  redirect(destination);
}
