'use client'

import dynamic from 'next/dynamic'

const VerifyForm = dynamic(() => import('./VerifyForm'), {
  ssr: false,
  loading: () => <div className="text-white/60">Loading...</div>,
})

export default function VerifyClientWrapper({ email }: { email: string }) {
  return <VerifyForm email={email} />
}