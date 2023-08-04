import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { projectDetails } from '~/sanity/projectDetails'
import schema from '~/sanity/schema'
import { defaultDocumentNode, structure } from '~/sanity/structure'

export const config = defineConfig({
  ...projectDetails(),
  name: 'abrahams-mind',
  title: "Abraham's mind",
  plugins: [deskTool({ structure, defaultDocumentNode }), visionTool(), codeInput()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
