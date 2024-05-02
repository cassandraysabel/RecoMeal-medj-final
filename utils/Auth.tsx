import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
// import { onAuthStateChanged, User } from 'firebase/auth'
// import { auth } from './firebase'

interface IAuthContext {
  user: null | User
  setuser: (user: null | User) => void
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setuser: () => {}
})
export default function AuthProvider({ children }) {

  const [user, setuser] = useState<null | User>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setuser(newUser)
      } else {
        setuser(null)
      }
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    setuser
  }
  return (
   <AuthContext.Provider value={value}>
    {children}
   </AuthContext.Provider>
  )
}
