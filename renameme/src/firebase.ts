import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { GoogleAuthProvider, browserLocalPersistence, connectAuthEmulator, getAuth, setPersistence } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { getPerformance } from 'firebase/performance'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
}

const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)

export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)

try {
  getPerformance(app)
}
catch {
  // performance seems to only work in production
}

export const persistancePromise = setPersistence(auth, browserLocalPersistence)

export const googleProvider = new GoogleAuthProvider()

export const logAnalytics = (eventName: string, eventParams?: Record<string, any>) => {
  if (!import.meta.env.PROD) return

  logEvent(analytics, eventName, eventParams)
}

if (import.meta.env.DEV) {
  console.log('INFO: Using Firebase emulators')

  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
  // connectFunctionsEmulator(functions, '127.0.0.1', 5001)
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LdQ45spAAAAAL5vKzy422j_9AnFm9G9PXfMYEhe'),
  isTokenAutoRefreshEnabled: true,
})
