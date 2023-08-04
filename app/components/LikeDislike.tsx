import { useFetcher, useLocation } from '@remix-run/react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { css, cva } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

type LikeDislikeProps = {
  id: string
  likes: number
  dislikes: number
}

export function LikeDislike(props: LikeDislikeProps) {
  const { id } = props
  const fetcher = useFetcher()
  const location = useLocation()

  // Use fresh data returned from the ActionFunction, if a mutation has just finished
  const isDone = fetcher.state === 'idle' && fetcher.data !== null
  const isWorking = fetcher.state === 'loading' || fetcher.state === 'submitting'

  const likes = isDone && Number(fetcher?.data?.likes) ? fetcher.data.likes : props?.likes
  const optimisticLikes = fetcher.formData && fetcher.formData.get('action') === 'LIKE' ? likes + 1 : likes
  const displayLikes = optimisticLikes || likes

  const dislikes = isDone && Number(fetcher?.data?.dislikes) ? fetcher.data.dislikes : props?.dislikes
  const optimisticDislikes = fetcher.formData && fetcher.formData.get('action') === 'DISLIKE' ? dislikes + 1 : dislikes
  const displayDislikes = optimisticDislikes || dislikes

  return (
    <fetcher.Form
      action={location.pathname}
      className={flex({
        align: 'center',
        justify: 'center',
        gap: '4',
        bgColor: 'black',
        color: 'white',
      })}
      method="post"
    >
      <input name="id" type="hidden" value={id} />
      <button name="action" type="submit" value="LIKE" disabled={isWorking} title="Like" className={button()}>
        <span className={css({ textStyle: 'xs', fontWeight: 'bold' })}>{displayLikes}</span>
        <ThumbsUp />
        <span className={css({ srOnly: true })}>Like</span>
      </button>
      <button name="action" type="submit" value="DISLIKE" disabled={isWorking} title="Dislike" className={button()}>
        <ThumbsDown />
        <span className={css({ textStyle: 'xs', fontWeight: 'bold' })}>{displayDislikes}</span>
        <span className={css({ srOnly: true })}>Dislike</span>
      </button>
    </fetcher.Form>
  )
}

const button = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    bgColor: 'black',
    color: 'white',
    p: '4',
    transition: 'all 100ms ease-in-out',
    cursor: 'pointer',
    _hover: {
      bgColor: 'cyan.400',
      color: 'black',
    },
    _disabled: {
      opacity: 0.5,
    },
  },
})
