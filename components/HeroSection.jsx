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

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
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
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              {shortBio}
            </motion.p>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              {socialLinks?.map((link, index) => (
                <motion.div
                  key={link.platform}
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    aria-label={`Visit my ${link.platform}`}
                  >
                    <span className="capitalize">{link.platform}</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#projects" className="btn btn-primary btn-lg">
                View My Work
              </Link>
              <Link href="#contact" className="btn btn-outline btn-lg">
                Get In Touch
              </Link>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-full blur-3xl opacity-20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20">
                {profileImage ? (
                  <Image
                    src={urlFor(profileImage).width(400).height(400).url()}
                    alt={profileImage?.alt || `${name}'s profile picture`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-4xl">👤</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

