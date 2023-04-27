import { getServerSideSitemap } from 'next-sitemap';

import SitemapService from '../../../http/SitemapService';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function getServerSideProps(ctx) {
  let fields = [];

  const selections = await SitemapService.getSelectionsList();

  selections.data?.data?.data?.map((item) => {
    fields.push({
      loc: `${baseUrl}selections/${item?.slug}`,
      changefreq: 'weekly',
      priority: 0.9,
    });
  });

  return getServerSideSitemap(ctx, fields);
}

export default function SitemapIndex() {}
