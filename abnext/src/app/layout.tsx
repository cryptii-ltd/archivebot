import './globals.css'

import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'ArchiveBot',
  description: 'The Ultimate Discord Message Archiving Solution',
}

/**
 * The root layout of the application.
 *
 * This component renders the HTML tags for the application, and
 * includes the navigation bar and footer.
 *
 * @param {{ children: React.ReactNode }} props The props for the component.
 * @returns {JSX.Element} The root layout of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-sectionDark m-auto'>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
