// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGEID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth()

