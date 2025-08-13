import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing NEWS_API_KEY' }, { status: 500 });
  }

  const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
