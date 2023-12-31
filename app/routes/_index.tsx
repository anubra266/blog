import type { LoaderArgs, SerializeFrom, V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { RouteMatch } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import groq from 'groq'
import { grid } from 'styled-system/patterns'

import { PreviewWrapper } from '~/components/PreviewWrapper'
import { Records } from '~/components/Records'
import { Title } from '~/components/Title'
import { deduplicateDrafts } from '~/lib/deduplicateDrafts'
import { getPreviewToken } from '~/lib/getPreviewToken'
import { useRootLoaderData } from '~/lib/useRootLoaderData'
import type { loader as rootLoader } from '~/root'
import { getClient } from '~/sanity/client'
import { recordStubsZ } from '~/types/record'

export const meta: V2_MetaFunction = ({ matches }) => {
  const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined

  const home = rootData ? rootData.data.home : null
  const title = [home?.siteTitle, home?.title].filter(Boolean).join(' | ')

  return [{ title }]
}

export const loader = async ({ request }: LoaderArgs) => {
  const { preview } = await getPreviewToken(request)
  const query = groq`*[_type == "record"][0...12]|order(title asc){
    _id,
    _type,
    title,
    date,
    "slug": slug.current,
    image
  }`

  const records = await getClient(preview)
    .fetch(query)
    .then((res) => (res ? recordStubsZ.parse(res) : null))

  const recordsDeduped = records?.length && preview ? recordStubsZ.parse(deduplicateDrafts(records)) : records

  if (!records) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
    records: recordsDeduped,
    query: preview ? query : null,
    params: preview ? {} : null,
  })
}

export default function Index() {
  const { records = [], query, params } = useLoaderData<typeof loader>()
  const { home, query: homeQuery, params: homeParams } = useRootLoaderData()

  return (
    <div className={grid({ gridTemplateColumns: '1', gap: { base: '6', md: '12' } })}>
      <PreviewWrapper
        data={home}
        render={(data) => (data?.title ? <Title>{data.title}</Title> : null)}
        query={homeQuery}
        params={homeParams}
      />
      <PreviewWrapper
        data={records}
        render={(data) => <Records records={data ?? []} />}
        query={query}
        params={params}
      />
    </div>
  )
}
