import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'velora-ecommerce',

  projectId: 'nqpi4qei',
  dataset: 'velora-dataset',

  plugins: [structureTool(), visionTool()],
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
})
