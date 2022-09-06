import {getServerSideSitemapIndex} from "next-sitemap";
import SelectionService from "../../../http/SitemapService";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const { bookType } = ctx.params;

  if (bookType.endsWith('.xml')) {
    if ()
  }

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}
