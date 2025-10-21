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
    <main className="min-h-screen modern-bg">
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
              © {new Date().getFullYear()} {personalInfo?.name || 'Portfolio'}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Revalidate page every hour
export const revalidate = 3600

