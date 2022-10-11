import {getServerSideSitemapIndex} from "next-sitemap";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  fields.push(
    `${baseUrl}sitemap/pages.xml`,
    `${baseUrl}sitemap/books.xml`,
    `${baseUrl}sitemap/audiobooks.xml`,
    `${baseUrl}sitemap/selections.xml`,
    `${baseUrl}sitemap/book-categories.xml`,
    `${baseUrl}sitemap/audiobook-categories.xml`,
    `${baseUrl}sitemap/authors.xml`,
    `${baseUrl}sitemap/series.xml`,
  )

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}
