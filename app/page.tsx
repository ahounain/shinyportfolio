'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center min-h-[calc(100vh-120px)]'
    >
      <h1 className='text-4xl font-bold mb-4'>Ali Hounain</h1>
      <p className='text-xl mb-8 text-center max-w-2xl'>
        Recent Computer Science major graduate from the University of
        Massachusetts Boston.
      </p>
      <p>Aspiring software engineer.</p>
      <div className='flex space-x-4'>
        <Link
          href='https://github.com/ahounain'
          className='transition-transform hover:scale-110'
        >
          <Github size={24} />
        </Link>
        <Link
          href='https://www.linkedin.com/in/ali-hounain/'
          className='transition-transform hover:scale-110'
        >
          <Linkedin size={24} />
        </Link>
      </div>
    </motion.div>
  );
}

