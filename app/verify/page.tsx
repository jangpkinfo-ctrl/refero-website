import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VerifyForm from './VerifyForm'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams
  const userEmail = email || ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <VerifyForm email={userEmail} />
      </main>
      <Footer />
    </div>
  )
}