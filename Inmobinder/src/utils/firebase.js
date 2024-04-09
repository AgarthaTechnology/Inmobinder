import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNu2t52GgXHdOupTmYH3zDWwK7Jt0mhJs",
  authDomain: "agartha-marketing-agency.firebaseapp.com",
  databaseURL: "https://agartha-marketing-agency-default-rtdb.firebaseio.com",
  projectId: "agartha-marketing-agency",
  storageBucket: "agartha-marketing-agency.appspot.com",
  messagingSenderId: "122797123050",
  appId: "1:122797123050:web:3142f05845de544cbebe93",
  measurementId: "G-1EWNYSNECN"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);}
  export {firebase}
  export const auth = firebase.auth();
  export const db = firebase.firestore();
  export const provider = new GoogleAuthProvider();