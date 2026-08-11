import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/config'
import { doc, getDoc, updateDoc, serverTimestamp, collection, query, where, getDocs, limit } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 })
    }

    // ✅ Find user by email using modular syntax
    const q = query(
      collection(db, 'users'),
      where('email', '==', email),
      limit(1)
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const userDoc = snapshot.docs[0]
    const userId = userDoc.id
    const userData = userDoc.data()

    // Get OTP
    const otpDoc = await getDoc(doc(db, 'users', userId, 'otp', 'current'))
    if (!otpDoc.exists()) {
      return NextResponse.json({ message: 'OTP not found' }, { status: 400 })
    }

    const otpData = otpDoc.data()
    const storedOtp = otpData['code']
    const expiresAt = otpData['expiresAt']?.toDate?.() || new Date(0)
    const isUsed = otpData['isUsed'] ?? false

    if (isUsed || new Date() > expiresAt) {
      return NextResponse.json({ message: 'OTP expired or already used' }, { status: 400 })
    }

    if (storedOtp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 })
    }

    // Mark OTP as used and verify email
    await updateDoc(doc(db, 'users', userId, 'otp', 'current'), {
      isUsed: true,
    })

    await updateDoc(doc(db, 'users', userId), {
      isEmailVerified: true,
      updatedAt: serverTimestamp(),
    })

    return NextResponse.json({ success: true, message: 'Email verified' })
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}