'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Support</h1>
        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white">📧 Email Support</h2>
            <p className="text-white/60 mt-2">Send us an email and we'll get back to you within 24 hours.</p>
            <a
              href="mailto:support@referoglobal.com"
              className="inline-block mt-3 text-primary-400 hover:text-primary-300"
            >
              support@referoglobal.com →
            </a>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white">💬 In-App Support</h2>
            <p className="text-white/60 mt-2">Open a support ticket directly from the Refero app.</p>
            <p className="text-white/40 text-sm mt-1">Download the app to access this feature.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white">📱 WhatsApp</h2>
            <p className="text-white/60 mt-2">Quick chat assistance via WhatsApp.</p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-primary-400 hover:text-primary-300"
            >
              Chat on WhatsApp →
            </a>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white">❓ FAQ</h2>
            <p className="text-white/60 mt-2">Find answers to common questions.</p>
            <Link
              href="/faq"
              className="inline-block mt-3 text-primary-400 hover:text-primary-300"
            >
              View FAQs →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}