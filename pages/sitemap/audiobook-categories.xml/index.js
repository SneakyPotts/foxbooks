import {getServerSideSitemapIndex} from "next-sitemap";
import CategoriesService from "../../../http/CategoriesService";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const audioCategories = await CategoriesService.getAudioCategoriesWithCount()

  audioCategories.data?.data?.map(item => {
    fields.push(
      `${baseUrl}categories/audiobooks/${item?.slug}`,
    )
  })


  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}