import { NextResponse } from 'next/server';

export function middleware(request) {
  const { url } = request;

  if (url.includes('page=1')) {
    const newUrl = url
      .replace(/&page=1/, '')
      .replace(/\?page=1&/, '?')
      .replace(/\?page=1/, '');

    return NextResponse.redirect(newUrl, 308);
  } else {
    return NextResponse.next();
  }
}
