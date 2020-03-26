import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_APP_ID
}

app.initializeApp(config)

export const auth = app.auth()
export const provider = new app.auth.GoogleAuthProvider()
export const db = app.database()