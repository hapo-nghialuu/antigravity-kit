import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const contentDir = path.join(process.cwd(), 'public', 'content');
    const files = fs.readdirSync(contentDir);
    return NextResponse.json({ status: 'ok', files });
  } catch (e: any) {
    return NextResponse.json({ status: 'error', message: e.message });
  }
}
