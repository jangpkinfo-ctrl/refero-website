import { Suspense } from 'react'
import { connection } from 'next/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VerifyForm from './VerifyForm'

export default async function Page() {
  await connection() // ✅ Forces dynamic rendering, no prerender

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div className="text-white/60">Loading...</div>}>
          <VerifyForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}