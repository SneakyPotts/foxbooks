import {getServerSideSitemapIndex} from "next-sitemap";
import SitemapService from "../../../http/SitemapService";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const { bookType } = ctx.params;

  if (bookType.endsWith('.xml')) {
    let data;
    if (bookType.includes('books')) {
      const type = bookType.includes('audiobooks')
        ? 'audio_book'
        : 'book';

      data = await SitemapService.getBooksList(type);
    } else if (bookType.includes('authors')) {
      data = await SitemapService.getAuthorsList();
    } else if (bookType.includes('series')) {
      data = await SitemapService.getSeriesList();
    }

    for (let i = 1; i <= data.data.data.last_page; i++) {
      fields.push(
        `${baseUrl}sitemap/${bookType.slice(0, bookType.length - 4)}/${i}.xml`,
      )
    }
  }

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}
