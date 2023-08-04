import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

export function ExitPreview() {
  return (
    <div
      className={flex({
        pointerEvents: 'none',
        pos: 'fixed',
        inset: '0',
        h: 'screen',
        w: 'screen',
        align: 'flex-end',
        justify: 'center',
      })}
    >
      <form className={css({ pointerEvents: 'auto' })} action="/resource/preview" method="POST">
        <button className={css({ bgColor: 'black', p: '4', fontWeight: 'bold', color: 'white' })} type="submit">
          Exit Preview Mode
        </button>
      </form>
    </div>
  )
}
