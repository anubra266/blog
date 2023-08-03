import { Logo } from '~/components/Logo'

export function Footer() {
  return (
    <header className="border-t border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <Logo />
        <div className="flex flex-1 flex-col items-end justify-end gap-2 text-sm md:flex-row md:items-center md:gap-5">
          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href="https://x.com/anubra266"
            target="_blank"
            rel="noreferrer"
          >
            Twitter / X
          </a>
          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href="https://github.com/anubra266"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
