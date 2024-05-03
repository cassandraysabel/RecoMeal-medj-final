import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "./firebase";
import { setData } from "./asyncstorage";
// import { onAuthStateChanged, User } from 'firebase/auth'
// import { auth } from './firebase'

interface IAuthContext {
  user: null | User;
  setuser: (user: null | User) => void;
  signIn: (email: any, password: any) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setuser: () => {},
  signIn: async (email: any, password: any) => {},
  signOut: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setuser] = useState<null | User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setuser(newUser);
        console.log(user?.displayName)
      } else {
        setuser(null);
      }

      setData("user", newUser);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password);
    
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    user,
    setuser,
    signIn,
    signOut
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}