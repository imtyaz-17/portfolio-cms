'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
}

export default function SkillsSection({ data }) {
  if (!data || !Array.isArray(data)) return null

  // Group skills by category
  const skillsByCategory = data.reduce((acc, skill) => {
    const category = skill.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {})

  const categoryOrder = ['frontend', 'backend', 'database', 'tools', 'design', 'other']
  const sortedCategories = categoryOrder.filter(cat => skillsByCategory[cat])

  return (
    <section id="skills" className="section-padding">
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
              Skills & Technologies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto mt-6" />
          </motion.div>

          {/* Skills Grid */}
          <div className="space-y-12">
            {sortedCategories.map((category) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold capitalize">
                  {category === 'frontend' && 'Frontend Development'}
                  {category === 'backend' && 'Backend Development'}
                  {category === 'database' && 'Database & Storage'}
                  {category === 'tools' && 'Tools & Platforms'}
                  {category === 'design' && 'Design & UI/UX'}
                  {category === 'other' && 'Other Skills'}
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {skillsByCategory[category].map((skill) => (
                    <motion.div
                      key={skill._id}
                      variants={skillVariants}
                      whileHover="hover"
                      className="group"
                    >
                      <div className="card hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col items-center space-y-3 p-4">
                          {skill.icon ? (
                            <div className="w-12 h-12 relative">
                              <Image
                                src={urlFor(skill.icon).width(48).height(48).url()}
                                alt={skill.icon?.alt || skill.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <span className="text-primary font-bold text-lg">
                                {skill.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

