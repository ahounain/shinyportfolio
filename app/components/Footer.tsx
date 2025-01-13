import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Ali Hounain</p>
        <div className="flex space-x-4">
          <Link href="https://github.com/ahounain" className="hover:text-gray-300">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/ali-hounain/" className="hover:text-gray-300">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

