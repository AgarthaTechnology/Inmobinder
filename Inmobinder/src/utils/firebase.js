import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNu2t52GgXHdOupTmYH3zDWwK7Jt0mhJs",
  authDomain: "agartha-marketing-agency.firebaseapp.com",
  databaseURL: "https://agartha-marketing-agency-default-rtdb.firebaseio.com/",
  projectId: "agartha-marketing-agency",
  storageBucket: "agartha-marketing-agency.appspot.com",
  messagingSenderId: "122797123050",
  appId: "1:122797123050:web:3142f05845de544cbebe93",
  measurementId: "G-1EWNYSNECN"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(firebaseApp);

// Create GoogleAuthProvider instance
export const provider = new GoogleAuthProvider();
