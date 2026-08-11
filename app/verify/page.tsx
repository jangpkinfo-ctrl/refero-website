'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!email) {
      router.push('/')
    }
  }, [email, router])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [])

  useEffect(() => {
    if (resendTimer > 0 && !canResend) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(true)
    }
  }, [resendTimer, canResend])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.split('').slice(0, 6)
      const newOtp = [...otp]
      digits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit
      })
      setOtp(newOtp)
      const lastIndex = Math.min(digits.length - 1, 5)
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex]?.focus()
      }
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, 6)
    const digits = pasted.split('')
    const newOtp = [...otp]
    digits.forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit
    })
    setOtp(newOtp)
    const lastIndex = Math.min(digits.length - 1, 5)
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex]?.focus()
    }
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < 6) {
      toast.error('Please enter the full 6-digit code')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Email verified!')
        setTimeout(() => {
          router.push('/download')
        }, 1000)
      } else {
        toast.error(data.message || 'Invalid OTP. Please try again.')
        setOtp(['', '', '', '', '', ''])
        if (inputRefs.current[0]) {
          inputRefs.current[0]?.focus()
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setCanResend(false)
    setResendTimer(30)

    try {
      await fetch('/api/retransmit-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      toast.success('New OTP sent to your email')
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Verify Your Email</h2>
            <p className="text-white/60 mt-2">
              We sent a 6-digit code to<br />
              <span className="text-white/80 font-medium">{email}</span>
            </p>
          </div>

          <div className="card-glass p-6 md:p-8">
            <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold text-white bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-primary-500"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Verifying...' : 'Verify Email →'}
            </button>

            <div className="text-center mt-4">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Didn't receive code? Resend
                </button>
              ) : (
                <span className="text-white/40 text-sm">
                  Resend in {resendTimer}s
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}