import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SignupForm from './SignupForm'

// ✅ CRITICAL: Force dynamic rendering
// Without this, Next.js tries to prerender the page at build time
// and fails because useSearchParams() is used
export const dynamic = 'force-dynamic'

export default function SignupPage() {
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
          <SignupForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}