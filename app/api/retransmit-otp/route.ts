import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/config'
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs, limit } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    // ✅ Find user using modular syntax
    const q = query(
      collection(db, 'users'),
      where('email', '==', email),
      limit(1)
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const userId = snapshot.docs[0].id

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await setDoc(doc(db, 'users', userId, 'otp', 'current'), {
      code: otp,
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      isUsed: false,
    })

    // Send OTP via your existing API
    const otpApiUrl = process.env.NEXT_PUBLIC_OTP_API_URL || 'https://refero-otp-api.vercel.app/api'
    await fetch(`${otpApiUrl}/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })

    return NextResponse.json({ success: true, message: 'OTP resent' })
  } catch (error) {
    console.error('Resend OTP error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}