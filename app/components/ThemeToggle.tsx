import { useFetcher, useLoaderData } from '@remix-run/react'
import { Moon, Sun } from 'lucide-react'
import { css } from 'styled-system/css'

export function ThemeToggle() {
  const cookieToggle = useFetcher()
  const { themePreference } = useLoaderData()

  const isDarkMode = themePreference === `dark`

  return (
    <cookieToggle.Form method="post" action="/resource/toggle-theme">
      <button type="submit" disabled={cookieToggle.state === 'submitting'} className={css({ cursor: 'pointer' })}>
        {isDarkMode ? <Sun className={css({ h: 'auto', w: '5' })} /> : <Moon className={css({ h: 'auto', w: '5' })} />}
        <div
          className={css({
            srOnly: true,
            userSelect: 'none',
          })}
        >
          {isDarkMode ? `Light` : `Dark`} Mode
        </div>
      </button>
    </cookieToggle.Form>
  )
}
