import { PortableText } from '@portabletext/react'
import { css, cx } from 'styled-system/css'
import { prose } from 'styled-system/recipes'

import { SanityCode } from '~/components/SanityCode'
import { SanityImage } from '~/components/SanityImage'

type ContentProps = {
  value: any[]
}

const components = {
  types: {
    image: SanityImage,
    code: SanityCode,
  },
  marks: {
    internalLink: ({ value, children }: any) => {
      const { slug = {} } = value
      const href = `/${slug.current}`
      return <a href={href}>{children}</a>
    },
    link: ({ value, children }: any) => {
      const { blank, href } = value
      return blank ? (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      )
    },
  },
}

export function SanityContent(props: ContentProps) {
  const { value } = props

  return (
    <div className={cx(prose({ size: { md: '2xl' } }), css({ fontFamily: '"PT Serif", serif' }))}>
      <PortableText value={value} components={components} />
    </div>
  )
}
