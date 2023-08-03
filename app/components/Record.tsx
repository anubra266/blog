import { LikeDislike } from '~/components/LikeDislike'
import { RecordCover } from '~/components/RecordCover'
import { SanityContent } from '~/components/SanityContent'
import { Title } from '~/components/Title'
import { formatDate } from '~/lib/formatDate'
import type { RecordDocument } from '~/types/record'

export function Record(props: RecordDocument) {
  const { _id, title, content, image, date, likes, dislikes } = props

  return (
    <article className="flex flex-col items-start gap-4 lg:flex-row lg:gap-12">
      <div className="grid-gap-4 mx-auto grid max-w-[70vw] grid-cols-1">
        <RecordCover image={image} title={title} />
        <LikeDislike id={_id} likes={likes} dislikes={dislikes} />
      </div>
      <div className="flex flex-shrink-0 flex-col gap-4 md:gap-6 lg:w-2/3">
        <header>
          {title ? <Title>{title}</Title> : null}
          <h2 className="bg-black text-2xl font-bold tracking-tighter text-white">{formatDate(date)}</h2>
        </header>
        {content && content?.length > 0 ? <SanityContent value={content} /> : null}
      </div>
    </article>
  )
}
