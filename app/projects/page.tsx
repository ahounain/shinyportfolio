'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    name: "Super BoxFinder",
    description:
      "a tool built specifically for UPS Stores to quickly find the right box for an item.",
    link: "https://superboxfinder-nhd4-fabpeq4tk-ahounains-projects.vercel.app/",
  },
  {
    name: "quake-topomap",
    description:
      "a web application that displays seismic data onto a topographic map.",
    link: "https://ahounain.github.io/quake-topomap/init/",
  },
  {
    name: "ashorbrain",
    description:
      "a web application that tells you which track the Alewife train shows up on at JFK/UMASS.",
    link: "https://ahounain.github.io/ashorbrain/",
  },
];

export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 gradient-text">projects</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div 
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-effect p-6 neon-border hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 gradient-text">{project.name}</h2>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <a 
              href={project.link} 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

