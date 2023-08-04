import { Link } from '@remix-run/react'
import { css, cx } from 'styled-system/css'
import { flex, grid } from 'styled-system/patterns'

import { RecordCover } from '~/components/RecordCover'
import { formatDate } from '~/lib/formatDate'
import type { RecordStub } from '~/types/record'

type RecordsProps = {
  records: RecordStub[]
}

export function Records(props: RecordsProps) {
  const { records = [] } = props

  const { me, posts } = records.reduce(
    (result, obj) => {
      const { slug } = obj
      if (slug === 'anubra266') {
        result.me = obj
      } else {
        result.posts.push(obj)
      }
      return result
    },
    { me: {} as RecordStub, posts: [] as RecordStub[] },
  )

  return (
    <ul
      className={grid({
        gridTemplateColumns: { base: '2', md: '3', lg: '4' },
        gap: { base: '6', md: '12' },
      })}
    >
      <PostItem post={me} />

      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  )
}

function PostItem({ post }: { post: RecordStub }) {
  return (
    <li className={cx('group', flex({ position: 'relative', direction: 'column' }))}>
      <div
        className={css({
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 200ms ease-in-out',
          _groupHover: { transform: 'scale(1.05)', opacity: 0.9 },
        })}
      >
        <div
          className={css({
            position: 'absolute',
            zIndex: '0',
            h: '48',
            w: '200%',
            translate: 'auto',
            '--translate-x': '2.3rem',
            '--translate-y': '2.3rem',
            '--rotate': '-45deg',
            transform: 'translate(var(--translate-x), var(--translate-y)) rotate(var(--rotate))',
            bgGradient: 'to-b',
            gradientFrom: 'white',
            gradientTo: 'transparent',
            opacity: 0.25,
            mixBlendMode: 'overlay',
            transition: 'transform 500ms cubic-bezier(.4,0,.2,1)',
            _groupHover: {
              '--translate-x': '1.5rem',
              '--translate-y': '1.5rem',
              opacity: 0.75,
            },
          })}
        />
        <RecordCover image={post.image} title={post.title} />
      </div>
      <div className={flex({ direction: 'column' })}>
        {post?.slug ? (
          <Link
            prefetch="intent"
            to={post?.slug}
            className={css({
              pt: '4',
              textStyle: { base: 'xl', md: '3xl' },
              fontWeight: 'bold',
              letterSpacing: 'tighter',
              transition: 'colors',
              transitionTimingFunction: 'ease-in-out',
              transitionDuration: '100',
              _hover: { bgColor: 'cyan.400', color: 'white' },
            })}
          >
            {post.title}
            {/* Makes this entire block clickable */}
            <span className={css({ pos: 'absolute', inset: '0' })} />
          </Link>
        ) : (
          <span
            className={css({
              pt: '4',
              textStyle: 'xl',
              fontWeight: 'bold',
              letterSpacing: 'tighter',
            })}
          >
            {post.title}
          </span>
        )}
        <span
          className={css({
            bgColor: 'black',
            fontWeight: 'bold',
            lineHeight: 'none',
            letterSpacing: 'tighter',
            color: 'white',
          })}
        >
          {formatDate(post.date)}
        </span>
      </div>
    </li>
  )
}
