import { css } from 'styled-system/css'
import { container, flex } from 'styled-system/patterns'

import { Logo } from '~/components/Logo'

export function Footer() {
  return (
    <footer
      className={css({
        borderTopWidth: '1px',
        borderColor: { base: 'gray.100', _dark: '#272A2EFF' },
        transition: 'colors',
        transitionTimingFunction: 'in.out',
        transitionDuration: '200ms',
      })}
    >
      <div
        className={container({
          display: 'flex',
          mx: 'auto',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '6',
          lg: { px: '32' },
        })}
      >
        <Logo />
        <div
          className={flex({
            flex: '1',
            flexDir: { base: 'column', md: 'row' },
            align: { base: 'flex-end', md: 'center' },
            justify: 'flex-end',
            gap: { base: '2', md: '5' },
            fontSize: 'sm',
            lineHeight: 'sm',
          })}
        >
          <a
            className={css({ _hover: { color: 'cyan.600', _dark: { color: 'cyan.200' } } })}
            href="https://x.com/anubra266"
            target="_blank"
            rel="noreferrer"
          >
            Twitter / X
          </a>
          <a
            className={css({ _hover: { color: 'cyan.600', _dark: { color: 'cyan.200' } } })}
            href="https://github.com/anubra266"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
