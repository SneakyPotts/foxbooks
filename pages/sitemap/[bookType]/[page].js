import {getServerSideSitemapIndex} from "next-sitemap";
import SitemapService from "../../../http/SitemapService";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const {bookType, page} = ctx.params;

  if (!!page) {
    let data;
    if (bookType.includes('books')) {
      const type = bookType === 'audiobooks'
        ? 'audio_book'
        : 'book';

      data = await SitemapService.getBooksList(type, page.slice(0, 1));
    } else if (bookType.includes('authors')) {
      data = await SitemapService.getAuthorsList(page.slice(0, 1));
    } else if (bookType.includes('series')) {
      data = await SitemapService.getSeriesList(page.slice(0, 1));
    }

    data.data.data.data.map((item) => {
      fields.push(
        `${baseUrl}${bookType}/${item.slug}`,
      )
    })
  }

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}
