import type { LoaderArgs, SerializeFrom, V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { RouteMatch } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import groq from 'groq'

import { PreviewWrapper } from '~/components/PreviewWrapper'
import { Record } from '~/components/Record'
import { getPreviewToken } from '~/lib/getPreviewToken'
import type { loader as rootLoader } from '~/root'
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og'
import { client } from '~/sanity/client'
import { recordZ } from '~/types/record'

export const meta: V2_MetaFunction = ({ data, matches }) => {
  const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined
  const home = rootData ? rootData.data.home : null
  const title = [data?.record?.title, home?.siteTitle].filter(Boolean).join(' | ')
  const { ogImageUrl } = data

  return [
    { title },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: title },
    { property: 'og:title', content: title },
    { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
    { property: 'og:image', content: ogImageUrl },
  ]
}

// Load the `record` document with this slug
export const loader = async ({ params, request }: LoaderArgs) => {
  const { preview } = await getPreviewToken(request)

  const query = groq`*[_type == "record" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    date,
    image,
    content
  }`

  const record = await client
    // Params from the loader uses the filename
    // $slug.tsx has the params { slug: 'hello-world' }
    .fetch(query, params)
    // Parsed with Zod to validate data at runtime
    // and generate a Typescript type
    .then((res) => (res ? recordZ.parse(res) : null))

  if (!record) {
    throw new Response('Not found', { status: 404 })
  }

  // Create social share image url
  const { origin } = new URL(request.url)
  const ogImageUrl = `${origin}/resource/og?id=${record._id}`

  return json({
    record,
    ogImageUrl,
    query: preview ? query : null,
    params: preview ? params : null,
  })
}

export default function RecordPage() {
  const { record, query, params } = useLoaderData<typeof loader>()

  return <PreviewWrapper data={record} render={Record} query={query} params={params} />
}
