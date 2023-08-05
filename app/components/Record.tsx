import { css } from 'styled-system/css'
import { flex, grid } from 'styled-system/patterns'

import { PostActions } from '~/components/PostActions'
import { RecordCover } from '~/components/RecordCover'
import { SanityContent } from '~/components/SanityContent'
import { Title } from '~/components/Title'
import { formatDate } from '~/lib/formatDate'
import type { RecordDocument } from '~/types/record'

export function Record(props: RecordDocument) {
  const { title, content, image, date } = props

  return (
    <article
      className={flex({ direction: { base: 'column', lg: 'row' }, align: 'start', gap: { base: '4', lg: '12' } })}
    >
      <div className={grid({ mx: 'auto', display: 'grid', maxW: '70vw', gridTemplateColumns: '1' })}>
        <RecordCover image={image} title={title} />
        <PostActions slug={props.slug} />
      </div>
      <div
        className={flex({
          display: 'flex',
          shrink: '0',
          direction: 'column',
          gap: { base: '4', md: '12' },
          lg: { w: '2/3' },
        })}
      >
        <header>
          {title ? <Title>{title}</Title> : null}
          <h2
            className={css({
              bgColor: { _light: 'black' },
              textStyle: '2xl',
              fontWeight: 'bold',
              letterSpacing: 'tighter',
              color: 'white',
            })}
          >
            {date && formatDate(date)}
          </h2>
        </header>
        {content && content?.length > 0 ? <SanityContent value={content} /> : null}
      </div>
    </article>
  )
}
