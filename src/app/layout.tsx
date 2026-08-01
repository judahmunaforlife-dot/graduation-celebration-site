import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google'
import { siteUrl } from '@/lib/site'
import { siteTheme } from '@/lib/celebration-data'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
})

const siteName = 'Graduation Celebration'
const title = 'A Special Day — Graduation Celebration'
const description =
  'Celebrating a beautiful graduation. Leave a moment, a blessing, and a memory for the graduate.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon-light-32x32.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName,
    title,
    description,
    url: '/',
    images: [
      {
        url: new URL('/images/graduate-portrait1.jpg', siteUrl),
        width: 800,
        height: 1000,
        alt: 'A beautiful graduation celebration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/graduate-portrait1.jpg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#2a0f2e',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme={siteTheme}
      className={`dark ${geistSans.variable} ${geistMono.variable} ${cormorant.variable} bg-background`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
