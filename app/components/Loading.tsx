import { css } from 'styled-system/css'

export function Loading() {
  return (
    <div
      className={css({
        animation: 'pulse',
        bg: 'red.50',
        p: '8',
        textAlign: 'center',
        borderWidth: '1px',
        borderColor: 'red.500',
        borderStyle: 'dashed',
      })}
    >
      Loading preview...
    </div>
  )
}
