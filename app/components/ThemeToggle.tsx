import { Moon, Sun } from 'lucide-react'
import { css } from 'styled-system/css'
import { useDarkMode } from 'usehooks-ts'

export function ThemeToggle() {
  const { isDarkMode, toggle } = useDarkMode(true)

  const iconClass = css({ h: 'auto', w: '5' })
  return (
    <button className={css({ cursor: 'pointer' })} onClick={toggle}>
      {isDarkMode ? <Sun className={iconClass} /> : <Moon className={iconClass} />}
      <div
        className={css({
          srOnly: true,
          userSelect: 'none',
        })}
      >
        {isDarkMode ? `Light` : `Dark`} Mode
      </div>
    </button>
  )
}
