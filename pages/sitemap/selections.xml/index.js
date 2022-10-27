import {getServerSideSitemapIndex} from "next-sitemap";
import SitemapService from "../../../http/SitemapService";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const selections = await SitemapService.getSelectionsList();

  selections.data?.data?.data?.map(item => {
    fields.push(
      `${baseUrl}selections/${item?.slug}`,
    )
  })

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}
