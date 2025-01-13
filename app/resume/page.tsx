'use client'
import { motion } from 'framer-motion'

export default function Resume() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      
      <div className="aspect-[8.5/11] w-full">
        <iframe 
          src="/aliresume.pdf" 
          className="w-full h-full"
          title="Ali Hounain's Resume"
        />
      </div>
    </motion.div>
  )
}


