import { css } from 'styled-system/css'
import { container } from 'styled-system/patterns'

import { Logo } from '~/components/Logo'
import { ThemeToggle } from '~/components/ThemeToggle'

type HeaderProps = {
  siteTitle?: string | null
}

export function Header(props: HeaderProps) {
  return (
    <header
      className={css({
        borderBottomWidth: '1px',
        borderColor: { base: 'gray.100', _dark: 'gray.900' },
        transition: 'colors',
        transitionTimingFunction: 'ease-in-out',
        transitionDuration: '1000ms',
      })}
    >
      <div
        className={container({
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '6',
          lg: { px: '32' },
        })}
      >
        <Logo siteTitle={props.siteTitle} />
        <ThemeToggle />
      </div>
    </header>
  )
}
