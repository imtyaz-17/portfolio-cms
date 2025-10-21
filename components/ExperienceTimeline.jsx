'use client'

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const timelineVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export default function ExperienceTimeline({ data }) {
  if (!data || !Array.isArray(data)) {
    return (
      <section id="experience" className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Work Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No work experience data available at the moment.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Present'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  const isCurrentJob = (experience) => !experience.endDate

  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Work Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and the experiences that shaped my career
            </p>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto mt-6" />
          </motion.div>

          {/* Timeline */}
          <div className="relative bg-muted/20 rounded-2xl p-8">
            {/* Full-height central timeline line */}
            <motion.div
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-0.5 origin-top z-0 pointer-events-none"
            />
            {/* Timeline Items */}
            <div className="space-y-12">
              {data.map((experience, index) => (
                <motion.div
                  key={experience._id}
                  variants={itemVariants}
                  className={`relative flex items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    className="absolute left-4 md:left-1/2 w-5 h-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full border-3 border-card transform -translate-x-2.5 md:-translate-x-2.5 z-10 shadow-lg ring-2 ring-blue-500/30"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeInOut'
                    }}
                  />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="card hover:shadow-lg transition-all duration-300"
                    >
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-foreground">
                              {experience.role}
                            </h3>
                            {isCurrentJob(experience) && (
                              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-primary">
                            {experience.company}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                          </p>
                        </div>

                        {/* Description */}
                        {experience.description && (
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <PortableText
                              value={experience.description}
                              components={{
                                block: {
                                  normal: ({ children }) => (
                                    <p className="text-muted-foreground leading-relaxed">
                                      {children}
                                    </p>
                                  ),
                                  h3: ({ children }) => (
                                    <h3 className="text-base font-semibold text-foreground mb-2">
                                      {children}
                                    </h3>
                                  ),
                                },
                                list: {
                                  bullet: ({ children }) => (
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                      {children}
                                    </ul>
                                  ),
                                  number: ({ children }) => (
                                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
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
                                },
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

