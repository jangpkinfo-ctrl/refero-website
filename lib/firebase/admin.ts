import admin from 'firebase-admin'

// ✅ Only use environment variables – no file reading
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
let privateKey = process.env.FIREBASE_PRIVATE_KEY

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    '❌ Missing Firebase Admin environment variables.\n' +
    'Please set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in your environment.'
  )
}

privateKey = privateKey.replace(/\\n/g, '\n')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  })
}

export const db = admin.firestore()
export const auth = admin.auth()