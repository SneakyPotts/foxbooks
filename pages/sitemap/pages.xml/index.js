import {getServerSideSitemapIndex} from "next-sitemap";
import SitemapService from "../../../http/SitemapService";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const pages = await SitemapService.getStaticPagesList();

  pages.data?.data?.map(item => {
    fields.push(
      `${baseUrl}/${item?.slug}`,
    )
  })

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}
