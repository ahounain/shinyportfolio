'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const links = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/resume', label: 'resume' },
  { href: '/misc', label: 'misc' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="glass-effect mx-auto max-w-4xl rounded-full mt-4">
      <nav className="bg-transparent shadow-sm text-white px-3">
        <ul className="flex justify-center space-x-4 py-4">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className=
              "relative px-3 py-2 transition duration-300 text-gray-300 hover:text-purple-400 rounded-lg hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:bg-purple-500/10">
                {label}
                {pathname === href && (
                  <motion.span
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-400 h-padding-value-1-rem-responsive-mobile-desktop-1%-display-block"
                    layoutId="underline"
                    initial={false}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

