import type { SerializeFrom } from '@remix-run/node'
import { Link, useRouteLoaderData } from '@remix-run/react'
import { css } from 'styled-system/css'

import { PreviewWrapper } from '~/components/PreviewWrapper'
import type { loader as rootLoader } from '~/root'

type LogoProps = {
  siteTitle?: string | null
}

export function Logo(props: LogoProps) {
  const { query: homeQuery, params: homeParams } = useRouteLoaderData(`root`) as SerializeFrom<typeof rootLoader>

  const { siteTitle } = props

  return (
    <p
      className={css({
        textStyle: { base: 'lg', lg: '2xl' },
        fontWeight: 'bold',
        letterSpacing: 'tighter',
        color: 'black',
        _dark: { color: 'white' },
      })}
    >
      <PreviewWrapper
        data={{ siteTitle }}
        render={({ siteTitle }) => <Link to="/">{siteTitle ?? `Abraham's mind`}</Link>}
        query={homeQuery}
        params={homeParams}
      />
    </p>
  )
}
