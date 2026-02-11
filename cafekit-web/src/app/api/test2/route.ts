import { NextResponse } from 'next/server';
import { getMDXContent } from '@/lib/mdx';

export async function GET() {
  try {
    const result = await getMDXContent('docs/vi/index');
    return NextResponse.json({ 
      status: result ? 'ok' : 'not_found', 
      title: result?.frontmatter.title
    });
  } catch (e: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: e.message
    });
  }
}
