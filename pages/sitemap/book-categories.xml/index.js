import {getServerSideSitemapIndex} from "next-sitemap";
import SitemapService from "../../../http/SitemapService";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const categories = await SitemapService.getCategories('books');

  categories.data?.data?.map(item => {
    fields.push(
      `${baseUrl}categories/books/${item?.slug}`,
    )
  })

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}