import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/twilight'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('jsx', jsx)

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
