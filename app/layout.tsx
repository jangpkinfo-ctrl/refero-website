import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Refero – Build Your Referral Network & Earn',
  description: 'Join Refero and earn commissions by building your referral network. 20% direct commissions, 5% network commissions.',
  keywords: 'referral marketing, earn commissions, network marketing, referral program',
  openGraph: {
    title: 'Refero – Build Your Referral Network',
    description: 'Start earning today with Refero referral platform.',
    url: 'https://referoglobal.com',
    siteName: 'Refero',
    images: [
      {
        url: 'https://referoglobal.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refero – Build Your Referral Network',
    description: 'Start earning today with Refero referral platform.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}