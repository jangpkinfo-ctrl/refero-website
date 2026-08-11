import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-6">Terms & Conditions</h1>
        <div className="prose prose-invert text-white/70 space-y-4">
          <p><strong>Last Updated:</strong> August 2026</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">1. Acceptance of Terms</h2>
          <p>By using the Refero app or website, you agree to these terms.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">2. Description of Service</h2>
          <p>Refero is a referral marketing platform that allows users to earn commissions by referring others to subscribe to paid plans.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">3. User Accounts</h2>
          <p>You are responsible for maintaining the security of your account and for all activities that occur under your account.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">4. Commissions</h2>
          <p>Commissions are earned according to the tier structure described in the app. Payments are made via bank transfer.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">5. Payment and Fees</h2>
          <p>All payments are processed manually. Refero reserves the right to change pricing at any time.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">6. Termination</h2>
          <p>We may terminate your account if you violate these terms.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">7. Limitation of Liability</h2>
          <p>Refero is not liable for any indirect or consequential damages.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">8. Governing Law</h2>
          <p>These terms are governed by the laws of Pakistan.</p>
          
          <p className="mt-6">For any questions, contact <a href="mailto:support@referoglobal.com" className="text-primary-400 hover:underline">support@referoglobal.com</a></p>
        </div>
      </main>

      <Footer />
    </div>
  )
}