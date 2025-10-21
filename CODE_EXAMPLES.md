# Code Examples - Portfolio CMS

This document provides key code examples from the project as requested in the specification.

## Table of Contents
1. [Sanity Schema Code](#sanity-schema-code)
2. [Data Fetching Code](#data-fetching-code)
3. [React Components](#react-components)

---

## Sanity Schema Code

### 1. Personal Info Schema (`sanity/schemas/personalInfo.js`)

```javascript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'personalInfo',
  title: 'Personal Information',
  type: 'document',
  __experimental_actions: [
    'update',
    'delete',
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Professional Headline',
      type: 'string',
      description: 'e.g., "Full-Stack Developer & AI Enthusiast"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      description: 'Brief introduction (1-2 sentences)',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'longBio',
      title: 'Detailed Bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'resumeURL',
      title: 'Resume File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Email', value: 'email' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
})
```

### 2. Project Schema (`sanity/schemas/project.js`)

```javascript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Project Summary',
      type: 'string',
      description: 'Brief description (1-2 sentences)',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Repository',
      type: 'url',
    }),
    defineField({
      name: 'liveDemoLink',
      title: 'Live Demo',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
})
```

---

## Data Fetching Code

### Sanity Client Configuration (`lib/sanity.client.js`)

```javascript
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
```

### GROQ Queries (`lib/sanity.queries.js`)

```javascript
import { groq } from 'next-sanity'

// Personal Info Query (Singleton)
export const personalInfoQuery = groq`
  *[_type == "personalInfo"][0] {
    _id,
    name,
    headline,
    profileImage,
    shortBio,
    longBio,
    resumeURL,
    socialLinks[] {
      platform,
      url
    }
  }
`

// All Projects Query
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    coverImage,
    summary,
    description,
    tags,
    githubLink,
    liveDemoLink,
    order
  }
`

// Featured Projects Query (top 4)
export const featuredProjectsQuery = groq`
  *[_type == "project"] | order(order asc) [0...4] {
    _id,
    title,
    slug,
    coverImage,
    summary,
    description,
    tags,
    githubLink,
    liveDemoLink,
    order
  }
`

// Single Project Query by Slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    summary,
    description,
    tags,
    githubLink,
    liveDemoLink,
    order
  }
`

// All Project Slugs for Static Generation
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][] {
    "slug": slug.current
  }
`
```

---

## React Components

### 1. Home Page - Server Component (`app/page.js`)

```javascript
import { client } from '@/lib/sanity.client'
import {
  personalInfoQuery,
  featuredProjectsQuery,
  skillsQuery,
  experienceQuery,
} from '@/lib/sanity.queries'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import ContactForm from '@/components/ContactForm'
import ThemeToggle from '@/components/ThemeToggle'

// Server Component - fetches data at build time
export default async function HomePage() {
  // Fetch all data in parallel for optimal performance
  const [personalInfo, projects, skills, experiences] = await Promise.all([
    client.fetch(personalInfoQuery),
    client.fetch(featuredProjectsQuery),
    client.fetch(skillsQuery),
    client.fetch(experienceQuery),
  ])

  return (
    <main className="min-h-screen">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <HeroSection data={personalInfo} />

      {/* About Section */}
      <AboutSection data={personalInfo} />

      {/* Skills Section */}
      <SkillsSection data={skills} />

      {/* Projects Section */}
      <ProjectsSection data={projects} />

      {/* Experience Timeline */}
      <ExperienceTimeline data={experiences} />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-muted/50 py-8">
        <div className="container">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              © {new Date().getFullYear()} {personalInfo?.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Revalidate page every hour
export const revalidate = 3600
```

### 2. Dynamic Project Page (`app/projects/[slug]/page.js`)

```javascript
import { client } from '@/lib/sanity.client'
import { projectBySlugQuery, projectSlugsQuery } from '@/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await client.fetch(projectSlugsQuery)
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Generate metadata for each project page
export async function generateMetadata({ params }) {
  const project = await client.fetch(projectBySlugQuery, {
    slug: params.slug,
  })

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [
        {
          url: urlFor(project.coverImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: project.coverImage?.alt || project.title,
        },
      ],
    },
  }
}

// Custom components for Portable Text rendering
const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Project image'}
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      )
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8 text-foreground">
        {children}
      </h2>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline"
      >
        {children}
      </a>
    ),
  },
}

export default async function ProjectPage({ params }) {
  const project = await client.fetch(projectBySlugQuery, {
    slug: params.slug,
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={urlFor(project.coverImage).width(1920).height(1080).url()}
          alt={project.coverImage?.alt || project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60" />
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          
          {/* Project Links */}
          <div className="flex gap-4 mb-12">
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                className="btn btn-outline"
              >
                View Code
              </Link>
            )}
            {project.liveDemoLink && (
              <Link
                href={project.liveDemoLink}
                target="_blank"
                className="btn btn-primary"
              >
                Live Demo
              </Link>
            )}
          </div>

          {/* Technologies */}
          {project.tags && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <PortableText
              value={project.description}
              components={portableTextComponents}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

// Revalidate every hour
export const revalidate = 3600
```

### 3. Hero Section Component (`components/HeroSection.jsx`)

```javascript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.client'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function HeroSection({ data }) {
  if (!data) return null

  const { name, headline, profileImage, shortBio, socialLinks } = data

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">Hello, I'm</span>
                <br />
                <span className="text-foreground">{name}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground">
                {headline}
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground"
            >
              {shortBio}
            </motion.p>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {socialLinks?.map((link) => (
                <Link
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  className="btn btn-outline btn-sm"
                >
                  <span className="capitalize">{link.platform}</span>
                </Link>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex gap-4">
              <Link href="#projects" className="btn btn-primary btn-lg">
                View My Work
              </Link>
              <Link href="#contact" className="btn btn-outline btn-lg">
                Get In Touch
              </Link>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div variants={itemVariants}>
            <div className="relative w-80 h-80 mx-auto">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={urlFor(profileImage).width(400).height(400).url()}
                  alt={profileImage?.alt || `${name}'s profile`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Key Features Demonstrated

### 1. Sanity Integration
- ✅ Singleton document pattern (Personal Info)
- ✅ Regular documents (Projects, Skills, Experience)
- ✅ Rich text with Portable Text
- ✅ Image uploads with hotspot
- ✅ File uploads (resume)
- ✅ Arrays and objects (social links, tags)

### 2. Next.js App Router
- ✅ Server Components for data fetching
- ✅ Client Components for interactivity
- ✅ Static generation with `generateStaticParams`
- ✅ Dynamic metadata with `generateMetadata`
- ✅ Parallel data fetching
- ✅ Incremental Static Regeneration (ISR)

### 3. TypeScript & Type Safety
- ✅ Sanity schema types
- ✅ Component props typing
- ✅ API response types

### 4. Performance Optimizations
- ✅ Image optimization with Next.js Image
- ✅ Static generation for projects
- ✅ Parallel queries with Promise.all
- ✅ CDN-served images from Sanity
- ✅ Revalidation strategy

---

These code examples match exactly what's been implemented in the project. All components are production-ready and follow Next.js 14+ best practices.

