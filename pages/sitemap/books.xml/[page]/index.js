import { getServerSideSitemap } from 'next-sitemap';

export async function getServerSideProps(ctx) {
  ctx.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=58');

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const { page } = ctx.params;
  const fields = [];

  if (page.endsWith('.xml')) {
    const pageNumber = page.replace('.xml', '');
    if (typeof Number.parseInt(pageNumber) === 'number') {
      // let firstPage = (page * 10) - 9
      // let lastPage = page * 10
      // let postResponse

      do {
        for (const post of posts) {
          fields.push({
            loc: baseUrl + post.mainCategory.slug + '/' + post.slug,
            lastmod: new Date(post.updated_at).toISOString(),
          });
        }

        // firstPage++
      } while (true);
    }
  }

  return getServerSideSitemap(ctx, fields);
}

export default function Sitemap() {}
