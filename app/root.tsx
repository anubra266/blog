import type { LinksFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import groq from 'groq'
import { container } from 'styled-system/patterns'
import { z } from 'zod'

import { ExitPreview } from '~/components/ExitPreview'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { themePreferenceCookie } from '~/cookies'
import { getPreviewToken } from '~/lib/getPreviewToken'
import { getClient } from '~/sanity/client'
import styles from '~/styles/app.css'
import { homeZ } from '~/types/home'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'preconnect', href: 'https://cdn.sanity.io' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'anonymous',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Inter:wght@500;700;800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap',
      rel: 'stylesheet',
    },
  ]
}

export const loader = async ({ request }: LoaderArgs) => {
  const { token, preview } = await getPreviewToken(request)

  // Dark/light mode
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const themePreference = z
    .union([z.literal('dark'), z.literal('light')])
    .optional()
    .parse(cookie.themePreference)

  // Sanity content throughout the site
  const query = groq`*[_id == "home"][0]{
    title,
    siteTitle
  }`
  const home = await getClient(preview)
    .fetch(query)
    .then((res) => (res ? homeZ.parse(res) : null))

  return json({
    home,
    preview,
    query: preview ? query : token,
    params: preview ? {} : null,
    token: preview ? token : null,
    themePreference,
    ENV: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
      SANITY_DATASET: process.env.SANITY_DATASET,
      SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    },
  })
}

export default function App() {
  const { ENV, themePreference, home, preview } = useLoaderData<typeof loader>()

  const { pathname } = useLocation()
  const isStudioRoute = pathname.startsWith('/studio')
  const isDarkMode =
    !themePreference && typeof document !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : themePreference === `dark`

  return (
    <html lang="en" className={isDarkMode ? 'dark' : 'light'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="https://fav.farm/🤘" />
        <Links />
        {isStudioRoute && typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        {isStudioRoute ? (
          <Outlet />
        ) : (
          <>
            <Header siteTitle={home?.siteTitle} />
            <div className={container({ px: '6', py: '12', lg: { px: '32' } })}>
              <Outlet />
            </div>
            <Footer />
          </>
        )}
        {preview ? <ExitPreview /> : null}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
