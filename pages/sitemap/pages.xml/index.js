import { getServerSideSitemap } from 'next-sitemap';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function getServerSideProps(ctx) {
  let fields = [];

  fields.push(
    {
      loc: `${baseUrl}`,
      changefreq: 'weekly',
      priority: 1,
    },
    {
      loc: `${baseUrl}audiobooks`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}books`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}categories`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}new`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}selections`,
      changefreq: 'weekly',
      priority: 0.9,
    },
  );

  return getServerSideSitemap(ctx, fields);
}

export default function SitemapIndex() {}
