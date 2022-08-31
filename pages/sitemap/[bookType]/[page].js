import {getServerSideSitemapIndex} from "next-sitemap";
import SelectionService from "../../../http/SitemapService";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const {bookType, page} = ctx.params;

  if (!!page) {
    const type = bookType === 'audiobooks'
      ? 'audio_book'
      : 'book';

    const booksList = await SelectionService.getBooksList(type, page.slice(0, 1));

    booksList.data.data.data.map((book) => {
      fields.push(
        `${baseUrl}${bookType}/${book.slug}`,
      )
    })
  }

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}