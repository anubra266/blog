import type { SanityImageObjectStub } from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'
import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

import { projectDetails } from '~/sanity/projectDetails'

type RecordCoverProps = {
  title?: string | null
  image?: SanityImageObjectStub
}

export function RecordCover(props: RecordCoverProps) {
  const { title, image } = props

  return (
    <div
      className={flex({
        aspectRatio: 'square',
        bg: 'gray.50',
      })}
    >
      {image ? (
        <img
          className={css({
            h: 'auto',
            w: 'full',
            objectFit: 'cover',
            shadowColor: 'black',
            transition: 'all 300ms ease-in-out',
            _groupHover: {
              shadow: '2xl',
              shadowColor: 'cyan.200',
            },
          })}
          src={urlBuilder(projectDetails())
            // @ts-ignore
            .image(image.asset._ref)
            .height(800)
            .width(800)
            .fit('max')
            .auto('format')
            .url()}
          alt={String(title) ?? ``}
          loading="lazy"
        />
      ) : (
        <div
          className={flex({
            aspectRatio: 'square',
            w: 'full',
            align: 'center',
            justify: 'center',
            bg: 'rgb(230 232 236)',
            color: 'gray.500',
          })}
        >
          {title ?? `Missing Record art`}
        </div>
      )}
    </div>
  )
}
