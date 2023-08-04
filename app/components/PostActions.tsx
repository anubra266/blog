import { useLocation } from '@remix-run/react'
import { TwitterIcon } from 'lucide-react'
import { css, cva } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

export function PostActions() {
  const { pathname } = useLocation()
  return (
    <div
      className={flex({
        align: 'center',
        justify: 'center',
        gap: '4',
        bgColor: 'black',
        color: 'white',
      })}
    >
      <a
        title="Twitter / X"
        className={button()}
        href={`https://twitter.com/intent/tweet?text=Article by @anubra266 https://blog.anubra266.com${pathname}`}
        target="_blank"
        rel="noreferrer"
      >
        <TwitterIcon />
        <span className={css({ srOnly: true })}>Post this</span>
      </a>
    </div>
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
