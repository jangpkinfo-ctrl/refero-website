export const dynamic = 'force-dynamic'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SignupForm from './SignupForm'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams
  const referralCode = ref || ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <SignupForm referralCode={referralCode} />
      </main>
      <Footer />
    </div>
  )
}