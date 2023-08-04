import type { PropsWithChildren } from 'react'
import { css } from 'styled-system/css'

export function Title(props: PropsWithChildren) {
  return props.children ? (
    <h1
      className={css({
        maxW: '4xl',
        textStyle: { base: '3xl', lg: '5xl', xl: '8xl' },
        fontWeight: 'bold',
        letterSpacing: 'tighter',
      })}
    >
      {props.children}
    </h1>
  ) : null
}
