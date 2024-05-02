// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfpimlhlb1eMKUK3rpBPCBdtoiyhDeOvo",
  authDomain: "recomeal-d1bbc.firebaseapp.com",
  projectId: "recomeal-d1bbc",
  storageBucket: "recomeal-d1bbc.appspot.com",
  messagingSenderId: "289193835028",
  appId: "1:289193835028:web:df513be0342385d7330501",
  measurementId: "G-SQYV0938BK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (name, email, password) => {
  try {
    console.log("HASJDAHKSJHLAJSHDKAJHSDKJ");
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        const user = cred.user;

        if (user == null) return user;

        await updateProfile(auth.currentUser, { displayName: name });
      }
    );
    console.log(
      auth.currentUser,
      auth.currentUser.displayName,
      auth.currentUser.email
    );
  } catch (err) {
    console.log(err);
  }
};
