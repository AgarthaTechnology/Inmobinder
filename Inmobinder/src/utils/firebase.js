import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEo3WrSAduDCatnQGqyjGemHvX-7FA0X8",
  authDomain: "inmobinderleo.firebaseapp.com",
  projectId: "inmobinderleo",
  storageBucket: "inmobinderleo.appspot.com",
  messagingSenderId: "361921354486",
  appId: "1:361921354486:web:ae11ea749af2574c5d2ad7",
  measurementId: "G-599Y3S2686"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);}
  export {firebase}
  export const auth = firebase.auth();
  export const db = firebase.firestore();
  export const provider = new GoogleAuthProvider();