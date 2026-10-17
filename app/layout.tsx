import './globals.css'
import Script from 'next/script'
import { Navigation } from './components/navigation'
export const metadata={title:'Ali Hounain — Software Engineer',description:'Technology Associate at Liberty Mutual. Backend systems, application modernization, and web applications.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Navigation />{children}<Script src="/opening.js?v=systems" strategy="afterInteractive" /></body></html>}
