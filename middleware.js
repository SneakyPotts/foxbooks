import { NextResponse } from 'next/server';

export function middleware(request) {
  const { url } = request;

  if (!url.includes('/reader') && url.includes('page=1') && !url.match(/page=1\d/)) {
    const newUrl = url
      .replace(/\?page=1$/, '')
      .replace(/\?page=1&/, '?')
      .replace(/&page=1/, '');

    return NextResponse.redirect(new URL(newUrl), 308);
  } else {
    return NextResponse.next();
  }
}
