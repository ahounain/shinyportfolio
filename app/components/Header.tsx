import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Ali Hounain</Link>
        <ul className="flex space-x-4">
          <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link href="/resume" className="hover:text-gray-300">Resume</Link></li>
          <li><Link href="/projects" className="hover:text-gray-300">Projects</Link></li>
          <li><Link href="/misc" className="hover:text-gray-300">Misc</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

