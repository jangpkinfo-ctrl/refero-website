import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <div className="prose prose-invert text-white/70 space-y-4">
          <p><strong>Last Updated:</strong> August 2026</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">1. Information We Collect</h2>
          <p>We collect your email, name, referral data, and payment information.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">2. How We Use Information</h2>
          <p>We use your data to provide our services, process payments, and improve the app.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">3. Data Storage</h2>
          <p>Your data is stored securely on Firebase servers.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">4. Sharing of Information</h2>
          <p>We do not share your personal data with third parties except as required by law.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">5. Security</h2>
          <p>We implement industry-standard security measures to protect your data.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">6. Your Rights</h2>
          <p>You may access, correct, or delete your personal data at any time.</p>
          
          <h2 className="text-xl font-semibold text-white mt-6">7. Changes to Policy</h2>
          <p>We may update this policy from time to time.</p>
          
          <p className="mt-6">For any questions, contact <a href="mailto:support@referoglobal.com" className="text-primary-400 hover:underline">support@referoglobal.com</a></p>
        </div>
      </main>

      <Footer />
    </div>
  )
}