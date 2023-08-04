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
}

export function SanityContent(props: ContentProps) {
  const { value } = props

  return (
    <div className={cx(prose({ size: { md: '2xl' } }), css({ fontFamily: '"PT Serif", serif' }))}>
      <PortableText value={value} components={components} />
    </div>
  )
}
