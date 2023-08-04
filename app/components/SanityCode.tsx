import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('css', css)

type SanityCodeProps = {
  value: {
    code: string
    language: string
  }
}

export function SanityCode(props: SanityCodeProps) {
  const { code, language } = props.value

  return (
    <SyntaxHighlighter language={language} style={dark}>
      {code}
    </SyntaxHighlighter>
  )
}
