import React, { createContext } from 'react'
import app from 'firebase/app'

export const FirebaseContext = createContext(null)

export default ({ children }) => {
  var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_APP_ID
  }
  app.initializeApp(config)
  return (
    <FirebaseContext.Provider value={ app }>
      { children }
    </FirebaseContext.Provider>
  )
}