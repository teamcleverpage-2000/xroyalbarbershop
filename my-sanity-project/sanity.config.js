import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'XRoyal Dashboard',
  projectId: 'pnnengxa',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Diensten')
              .child(
                S.documentTypeList('dienst')
                  .title('Diensten')
                  .defaultOrdering([
                    { field: 'volgorde', direction: 'asc' },
                    { field: '_createdAt', direction: 'asc' }
                  ])
              ),
            S.listItem()
              .title('Lookbook')
              .child(
                S.documentTypeList('lookbook')
                  .title('Lookbook')
                  .defaultOrdering([
                    { field: 'volgorde', direction: 'asc' },
                    { field: '_createdAt', direction: 'asc' }
                  ])
              ),
            S.listItem()
              .title('Openingstijden')
              .child(
                S.documentTypeList('openingstijd')
                  .title('Openingstijden')
                  .defaultOrdering([
                    { field: 'volgorde', direction: 'asc' },
                    { field: '_createdAt', direction: 'asc' }
                  ])
              )
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})