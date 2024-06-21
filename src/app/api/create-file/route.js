// src/app/api/create-file/route.js
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { script, keyword } = await req.json();
  const uniqueString = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `example-${uniqueString}.txt`;
  const content = `Script: ${script}\nKeyword: ${keyword}`;

  const filePath = path.join(process.cwd(), 'public', fileName);

  try {
    await fs.writeFile(filePath, content);
    return NextResponse.json({ fileName });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
  }
}