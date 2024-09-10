import './globals.css'

import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'ArchiveBot',
  description: 'The Ultimate Discord Message Archiving Solution',
}

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
