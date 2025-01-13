'use client'

import { motion } from 'framer-motion'

const interests = [
  { label: "favorite show", value: "One Piece" },
  { label: "favorite book", value: "The Trial - Kafka" },
  { label: "favorite movie", value: "The Human Condition" },
  { label: "things I'm learning", value: "rust, golang, react, typescript, sqlite, svelte " }
]

export default function Misc() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-6 gradient-text">miscellaneous</h1>
      <div className="space-y-6">
        {interests.map((item, index) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-effect p-6 neon-border hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 gradient-text">{item.label}</h2>
            <p className="text-gray-300">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

