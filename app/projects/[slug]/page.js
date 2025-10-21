import { client } from '@/lib/sanity.client'
import { projectBySlugQuery, projectSlugsQuery } from '@/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await client.fetch(projectSlugsQuery)
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Generate metadata for each project page
export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, {
    slug: slug,
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
      images: project.coverImage ? [
        {
          url: urlFor(project.coverImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: project.coverImage?.alt || project.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [urlFor(project.coverImage).width(1200).height(630).url()] : [],
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
          {value.caption && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </p>
          )}
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
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-6 text-foreground">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
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
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, {
    slug: slug,
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {project.coverImage ? (
          <Image
            src={urlFor(project.coverImage).width(1920).height(1080).url()}
            alt={project.coverImage?.alt || project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-6xl">📁</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-16">
            <div className="max-w-4xl">
              <Link
                href="/"
                className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                {project.title}
              </h1>
              
              <p className="text-xl text-muted-foreground">
                {project.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Project Info Bar */}
            <div className="flex flex-wrap gap-4 mb-12">
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </Link>
              )}
              {project.liveDemoLink && (
                <Link
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-md bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </Link>
              )}
            </div>

            {/* Technologies */}
            {project.tags && project.tags.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Description */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <PortableText
                value={project.description}
                components={portableTextComponents}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 mt-16">
        <div className="container">
          <div className="text-center">
            <Link
              href="/"
              className="btn btn-outline btn-lg"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Revalidate page every hour
export const revalidate = 3600

