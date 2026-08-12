import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SignupClientWrapper from './SignupClientWrapper'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <SignupClientWrapper />
      </main>
      <Footer />
    </div>
  )
}