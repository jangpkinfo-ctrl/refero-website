'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { validators } from '@/lib/utils/validators'

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const referralCode = searchParams.get('ref') || ''

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [disclaimer, setDisclaimer] = useState(false)
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    if (!referralCode) {
      router.push('/')
    }
  }, [referralCode, router])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    const result = validators.email(value)
    setEmailError(result.valid ? '' : result.message || '')
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const emailCheck = validators.email(email)
    if (!emailCheck.valid) {
      toast.error(emailCheck.message || 'Invalid email')
      return
    }

    if (!agreed) {
      toast.error('Please agree to Terms & Conditions')
      return
    }
    if (!disclaimer) {
      toast.error('Please acknowledge the earnings disclaimer')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          referralCode,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Account created! Please verify your email.')
        setTimeout(() => {
          router.push(`/verify?email=${encodeURIComponent(email)}`)
        }, 1000)
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-white/60 mt-2">Join Refero and start earning today</p>
          </div>

          <div className="card-glass p-6 md:p-8">
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="text-white/80 text-sm font-medium block mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="input-glass"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="your@email.com"
                  required
                  className={`input-glass ${emailError ? 'border-red-500' : ''}`}
                />
                {emailError && (
                  <p className="text-red-400 text-xs mt-1">{emailError}</p>
                )}
                <p className="text-white/40 text-xs mt-1">No temporary emails or aliases allowed</p>
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
                  className="input-glass"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium block mb-1">Referral Code 🔒</label>
                <div className="w-full px-4 py-3 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-400 font-mono">
                  {referralCode || 'No referral code'}
                </div>
                {!referralCode && (
                  <p className="text-white/40 text-xs mt-1">You need a referral code to join</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-2 text-white/70 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5"
                  />
                  I agree to the <Link href="/terms" className="text-primary-400 hover:underline">Terms & Conditions</Link>
                </label>
                <label className="flex items-start gap-2 text-white/70 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={disclaimer}
                    onChange={(e) => setDisclaimer(e.target.checked)}
                    className="mt-0.5"
                  />
                  I understand earnings depend on my referral efforts and are not guaranteed
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !!emailError || !referralCode}
                className="btn-primary"
              >
                {loading ? 'Creating...' : 'Create Account →'}
              </button>
            </form>

            <p className="text-white/40 text-center text-sm mt-4">
              Already have an account?{' '}
              <span className="text-primary-400">Open the Refero app</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}