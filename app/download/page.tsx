'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DownloadPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const response = await fetch('/api/check-verification')
        const data = await response.json()
        if (!data.verified) {
          window.location.href = '/'
        }
      } catch (error) {
        window.location.href = '/'
      } finally {
        setLoading(false)
      }
    }
    checkVerification()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">You're Verified! 🎉</h2>
          <p className="text-white/60 mb-8">
            Download the Refero app to start earning commissions.
          </p>

          <div className="card-glass p-6 md:p-8">
            <p className="text-white/80 text-sm mb-4">Choose your download option:</p>
            
            <div className="space-y-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.refero.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                📱 Download from Play Store
              </a>
              
              <a
                href="/refero.apk"
                download
                className="btn-secondary"
              >
                ⬇️ Download APK
              </a>
            </div>

            {/* ✅ Login link removed - replaced with app reference */}
            <p className="text-white/40 text-xs mt-4">
              Already have the app?{' '}
              <span className="text-primary-400">Open Refero and start earning!</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}