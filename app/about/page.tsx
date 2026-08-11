import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-6">About Refero</h1>
        <div className="prose prose-invert">
          <p className="text-white/70">
            Refero is a multi-tier referral marketing platform that allows users to earn commissions by building their referral network.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">How It Works</h2>
          <p className="text-white/70">
            Users subscribe to a plan, share their referral link, and earn commissions when their referrals subscribe.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">Commission Structure</h2>
          <ul className="text-white/70 list-disc pl-5 space-y-2">
            <li><strong>Direct Commission:</strong> 20% on every direct referral's subscription</li>
            <li><strong>Network Commission:</strong> 5% on sub-referrals up to specified depths</li>
          </ul>
          <h2 className="text-xl font-semibold text-white mt-6">Our Mission</h2>
          <p className="text-white/70">
            To empower individuals to earn passive income through genuine referrals and network building.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}