'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export default function AboutSection({ data }) {
  if (!data) return null

  const { profileImage, longBio } = data

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Image */}
          <motion.div
            variants={imageVariants}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              {profileImage ? (
                <Image
                  src={urlFor(profileImage).width(600).height(600).url()}
                  alt={profileImage?.alt || 'About me'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-6xl">👤</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 order-1 lg:order-2"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                About Me
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <PortableText
                value={longBio}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
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
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        {children}
                      </ol>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">
                        {children}
                      </strong>
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
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

