import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VerifyForm from './VerifyForm'

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Suspense
          fallback={
            <div className="w-full max-w-md text-center">
              <div className="text-white/60">Loading...</div>
            </div>
          }
        >
          <VerifyForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}