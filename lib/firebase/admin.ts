import admin from 'firebase-admin'
import * as fs from 'fs'
import * as path from 'path'

// Path to your service account JSON file
const serviceAccountPath = path.join(process.cwd(), 'service-account.json')

// Check if the file exists
if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Service account file not found at ${serviceAccountPath}`)
}

// Read and parse the JSON file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))

// Validate required fields
if (!serviceAccount.client_email || !serviceAccount.private_key) {
  throw new Error('Service account JSON is missing client_email or private_key')
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const db = admin.firestore()
export const auth = admin.auth()