import admin from 'firebase-admin'
import * as fs from 'fs'
import * as path from 'path'

// Read service account from file (bypasses environment variable issues)
const serviceAccountPath = path.join(process.cwd(), 'service-account.json')

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    `❌ service-account.json not found at ${serviceAccountPath}\n` +
    'Place your Firebase service account JSON file in the project root.'
  )
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))

if (!serviceAccount.client_email || !serviceAccount.private_key) {
  throw new Error('❌ service-account.json is missing client_email or private_key')
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const db = admin.firestore()
export const auth = admin.auth()