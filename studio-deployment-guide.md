# Sanity Studio Deployment Guide

## Option 1: Deploy Studio to Netlify (Recommended)

### Step 1: Create Studio Directory
```bash
mkdir portfolio-studio
cd portfolio-studio
```

### Step 2: Initialize Sanity Studio
```bash
npx create-sanity@latest --template clean --create-project "Portfolio Studio" --dataset production
```

### Step 3: Copy Your Schemas
Copy these files from your main project:
- `sanity/schemas/personalInfo.js`
- `sanity/schemas/project.js`
- `sanity/schemas/skill.js`
- `sanity/schemas/experience.js`

### Step 4: Update studio.config.js
```javascript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import personalInfo from './schemas/personalInfo'
import project from './schemas/project'
import skill from './schemas/skill'
import experience from './schemas/experience'

export default defineConfig({
  name: 'portfolio-studio',
  title: 'Portfolio Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
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
```

### Step 5: Deploy to Netlify
1. Push to GitHub
2. Connect to Netlify
3. Set environment variables:
   - `SANITY_STUDIO_PROJECT_ID`
   - `SANITY_STUDIO_DATASET`

## Option 2: Use Sanity's Hosted Studio

### Step 1: Deploy to Sanity
```bash
cd your-main-project
npx sanity deploy
```

### Step 2: Access Studio
Your studio will be available at:
`https://your-project-name.sanity.studio`

## Option 3: Local Development Only

Keep the studio for local development only and use Sanity's hosted studio for production.

## Recommended Approach

Use **Option 1** - Deploy studio separately to Netlify. This gives you:
- Full control over the studio
- Custom domain
- Same hosting as your main site
- Easy management
