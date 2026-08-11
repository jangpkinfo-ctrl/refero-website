import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'  // ✅ Use admin

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  
  if (!code) {
    return NextResponse.json({ valid: false, message: 'Referral code required' }, { status: 400 })
  }

  try {
    const snapshot = await db
      .collection('users')
      .where('referralCode', '==', code.toUpperCase())
      .where('isDeleted', '==', false)
      .limit(1)
      .get()
    
    if (snapshot.empty) {
      return NextResponse.json({ valid: false })
    }
    
    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error('Error validating referral code:', error)
    return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 })
  }
}