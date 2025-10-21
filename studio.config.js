import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import personalInfo from './sanity/schemas/personalInfo'
import project from './sanity/schemas/project'
import skill from './sanity/schemas/skill'
import experience from './sanity/schemas/experience'

export default defineConfig({
  name: 'portfolio-cms',
  title: 'Portfolio CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Personal Info')
              .child(
                S.document()
                  .schemaType('personalInfo')
                  .documentId('personalInfo')
              ),
            S.divider(),
            S.listItem()
              .title('Projects')
              .child(S.documentTypeList('project').title('Projects')),
            S.listItem()
              .title('Skills')
              .child(S.documentTypeList('skill').title('Skills')),
            S.listItem()
              .title('Experience')
              .child(S.documentTypeList('experience').title('Experience')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [personalInfo, project, skill, experience],
  },
})
