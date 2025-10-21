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

// All Skills Query
export const skillsQuery = groq`
  *[_type == "skill"] | order(name asc) {
    _id,
    name,
    icon,
    category
  }
`

// All Experience Query
export const experienceQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    company,
    role,
    startDate,
    endDate,
    description,
    order
  }
`

// All Project Slugs for Static Generation
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][] {
    "slug": slug.current
  }
`

