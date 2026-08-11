import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'  // ✅ Use admin

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 })
    }

    // Find user by email
    const userSnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get()

    if (userSnapshot.empty) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const userDoc = userSnapshot.docs[0]
    const userId = userDoc.id

    // Get OTP
    const otpDoc = await db
      .collection('users')
      .doc(userId)
      .collection('otp')
      .doc('current')
      .get()

    if (!otpDoc.exists) {
      return NextResponse.json({ message: 'OTP not found' }, { status: 400 })
    }

    const otpData = otpDoc.data()
    const storedOtp = otpData?.code
    const expiresAt = otpData?.expiresAt?.toDate?.() || new Date(0)
    const isUsed = otpData?.isUsed ?? false

    if (isUsed || new Date() > expiresAt) {
      return NextResponse.json({ message: 'OTP expired or already used' }, { status: 400 })
    }

    if (storedOtp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 })
    }

    // Mark OTP as used and verify email
    await db
      .collection('users')
      .doc(userId)
      .collection('otp')
      .doc('current')
      .update({
        isUsed: true,
      })

    await db
      .collection('users')
      .doc(userId)
      .update({
        isEmailVerified: true,
        updatedAt: new Date(),
      })

    return NextResponse.json({ success: true, message: 'Email verified' })
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}