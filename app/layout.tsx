import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from './components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ali Hounain - Portfolio',
  description: 'Personal portfolio of Ali Hounain, Computer Science student at UMass Boston',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
       
      </body>
    </html>
  )
}

