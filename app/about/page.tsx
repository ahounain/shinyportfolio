'use client'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl flex-col items-center mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">about me</h1>
      <p className="mb-4 my-auto  ">
        My name is Ali Hounain and I&apos;m a recent Computer Science major grad from
        the University of Massachusetts Boston. I&apos;m passionate about software development
        and web technologies, constantly seeking to expand my knowledge and skills.
      </p>
      <p>
        I&apos;m currently looking for new grad roles in the fields of software development 
        and web development. Feel free to explore my projects and learn more about 
        my interests and experiences.
      </p>
    </motion.div>
  )
}

