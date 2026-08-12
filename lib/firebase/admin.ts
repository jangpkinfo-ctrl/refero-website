import admin from 'firebase-admin'

// ✅ Read credentials from environment variables
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
let privateKey = process.env.FIREBASE_PRIVATE_KEY

// Validate that all required variables are present
if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    'Missing Firebase Admin environment variables.\n' +
    'Please set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in your environment.\n' +
    'For local development, add them to your .env.local file.'
  )
}

// Replace escaped newlines with actual newlines
privateKey = privateKey.replace(/\\n/g, '\n')

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export const db = admin.firestore()
export const auth = admin.auth()