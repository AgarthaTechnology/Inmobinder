import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ_yLYesyL6WR0ZVed0AG4GblnRUI-8zM",
  authDomain: "test-a0b1f.firebaseapp.com",
  projectId: "test-a0b1f",
  storageBucket: "test-a0b1f.appspot.com",
  messagingSenderId: "893630946205",
  appId: "1:893630946205:web:e0a674b9b81b24198fad74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);