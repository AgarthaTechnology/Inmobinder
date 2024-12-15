import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSp7j_vencCEvUUs7hcPXwRgPRSnp9Qqo",
  authDomain: "react-native-typescript-f183b.firebaseapp.com",
  projectId: "react-native-typescript-f183b",
  storageBucket: "react-native-typescript-f183b.appspot.com",
  messagingSenderId: "279705740378",
  appId: "1:279705740378:web:ee8ad2fabc59fdca002463",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
