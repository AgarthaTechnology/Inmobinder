import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSp7j_vencCEvUUs7hcPXwRgPRSnp9Qqo",
  authDomain: "react-native-typescript-f183b.firebaseapp.com",
  projectId: "react-native-typescript-f183b",
  storageBucket: "react-native-typescript-f183b.appspot.com",
  messagingSenderId: "279705740378",
  appId: "1:279705740378:web:ee8ad2fabc59fdca002463"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Storage
export const storage = getStorage(firebaseApp);

// Initialize Authentication
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(firebaseApp);