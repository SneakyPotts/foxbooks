import moment from 'moment/moment';
import { getServerSideSitemap } from 'next-sitemap';

import SitemapService from '../../../http/SitemapService';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function getServerSideProps(ctx) {
  let fields = [];

  const { bookType, page } = ctx.params;

  if (!!page) {
    let data;
    let customUrlPath = null;

    const reqPage = page.replace(/\.xml/, '');

    if (bookType.includes('books')) {
      const type = bookType === 'audiobooks' ? 'audio_book' : 'book';
      data = await SitemapService.getBooksList(type, reqPage);

      data.data.data.data.map((item) => {
        fields.push({
          loc: `${baseUrl}${bookType}/${item?.genre?.slug || item?.genres[0].slug}/${item.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: moment(item.updated_at).format('YYYY-MM-DD'),
        });
      });
    } else if (bookType.includes('authors')) {
      data = await SitemapService.getAuthorsList(reqPage);

      data.data.data.data.map((item) => {
        fields.push({
          loc: `${baseUrl}author/${item.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
        });
      });
    } else if (bookType.includes('series')) {
      const type = bookType.includes('audio') ? 'audio-books' : 'books';
      data = await SitemapService.getSeriesList({ type, page: reqPage });
      customUrlPath = `series/${type}`;

      data.data.data.data.map((item) => {
        fields.push(
          Object.assign(
            {
              loc: `${baseUrl}${customUrlPath}/${item.slug}`,
              changefreq: 'weekly',
              priority: 0.8,
            },
            Object.hasOwn(item, 'updated_at') && { lastmod: moment(item.updated_at).format('YYYY-MM-DD') },
          ),
        );
      });
    }
  }

  return getServerSideSitemap(ctx, fields);
}

export default function SitemapIndex() {}
