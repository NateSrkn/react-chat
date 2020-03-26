import React from 'react';
import { auth, provider } from '../utils/firebase'
import { Button } from './Button'

const Authenticate = ({ activeUser }) => {

  const signIn = () => {
    auth.signInWithRedirect(provider)
  }

  const signOut = () => {
    auth.signOut()
  }

  return (
    <div className="login-container">
      {activeUser ? 
      <Button onClick={() => signOut()}>
        Sign out
      </Button> 
      :
      <Button onClick={() => signIn()}>
        Sign In
      </Button>
      }
    </div>
  )
}

export default Authenticate