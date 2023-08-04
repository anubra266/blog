import { defineConfig } from '@pandacss/dev'
import typographyPreset from 'pandacss-preset-typography'

export default defineConfig({
  preflight: true,

  outExtension: 'js',
  include: ['./app/**/*.{ts,tsx,js,jsx}'],
  presets: [
    typographyPreset({
      prose: {
        colors: {
          link: 'prose.link',
          body: 'prose.body',
          heading: 'prose.body',
          // lead: 'slate.600',
          // counter: 'slate.500',
          // bullet: 'slate.300',
          // hrBorder: 'slate.200',
          // quote: 'slate.900',
          // quoteBorder: 'slate.200',
          // caption: 'slate.500',
          // bold: 'slate.900',
          // code: 'slate.900',
          // preCode: 'slate.200',
          // preBackground: 'slate.800',
          // thBorder: 'slate.300',
          // tdBorder: 'slate.200',
        },
      },
    }),
    '@pandacss/dev/presets',
  ],

  exclude: [],

  theme: {
    extend: {
      semanticTokens: {
        colors: {
          prose: {
            link: {
              value: {
                base: '{colors.cyan.600}',
                _dark: '{colors.cyan.200}',
              },
            },
            body: {
              value: {
                base: '{colors.black}',
                _dark: '{colors.white}',
              },
            },
          },
        },
      },
    },
  },

  outdir: 'styled-system',

  globalCss: {
    html: {
      textRendering: 'optimizeLegibility',
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      WebkitTextSizeAdjust: '100%',
      height: '100%',
      fontFamily: 'Inter',
    },
    body: {
      lineHeight: 'inherit',
      minHeight: 'screen',
      height: 'fit-content',
      maxHeight: '100%',
      bg: 'white',
      color: 'black',
      transition: 'colors',
      transitionDuration: '1000ms',
      transitionTimingFunction: 'ease-in-out',
      _dark: {
        colorScheme: 'dark',
        bg: 'rgb(16 17 18)',
        color: 'white',
      },
    },
  },
})
