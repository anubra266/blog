import { useLocation } from '@remix-run/react'
import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from 'lucide-react'
import { css, cva } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

const ACCOUNTS = [
  { name: 'Twitter / X', url: 'https://twitter.com/anubra266', icon: <TwitterIcon /> },
  { name: 'Github', url: 'https://github.com/anubra266', icon: <GithubIcon /> },
  { name: 'Linkedin', url: 'https://linkedin.com/in/anubra266', icon: <LinkedinIcon /> },
  { name: 'Email', url: 'mailto:anubra266@gmail.com', icon: <MailIcon /> },
] as const

export function PostActions({ slug }: { slug: string | null }) {
  const { pathname } = useLocation()
  const isMe = slug === 'anubra266'

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
      {isMe ? (
        ACCOUNTS.map((acc) => (
          <a
            key={acc.name}
            title={acc.name}
            className={button()}
            href={acc.url}
            {...(acc.name !== 'Email' && { target: '_blank', rel: 'noreferrer' })}
          >
            {acc.icon}
            <span className={css({ srOnly: true })}>My {acc.name}</span>
          </a>
        ))
      ) : (
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
      )}
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
