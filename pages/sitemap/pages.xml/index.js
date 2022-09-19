import {getServerSideSitemapIndex} from "next-sitemap";

export async function getServerSideProps(ctx) {
  let fields = [];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  fields.push(
    `${baseUrl}`,
    `${baseUrl}audiobooks`,
    `${baseUrl}books`,
    `${baseUrl}categories`,
    `${baseUrl}new`,
    `${baseUrl}selections`,
    `${baseUrl}holders`,
    `${baseUrl}settings`,
  )

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {
}