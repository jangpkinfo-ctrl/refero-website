'use client'

import dynamic from 'next/dynamic'

const SignupForm = dynamic(() => import('./SignupForm'), {
  ssr: false,
  loading: () => <div className="text-white/60">Loading...</div>,
})

export default function SignupClientWrapper() {
  return <SignupForm />
}