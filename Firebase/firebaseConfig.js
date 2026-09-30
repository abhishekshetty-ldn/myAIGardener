// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYwBW6qUWXydsCisURp4XFKkCbTKVkCCA",
  authDomain: "my-ai-gardener.firebaseapp.com",
  projectId: "my-ai-gardener",
  storageBucket: "my-ai-gardener.firebasestorage.app",
  messagingSenderId: "523920052464",
  appId: "1:523920052464:web:61641ead7ef19b0f4a3235",
  measurementId: "G-J91R31MZ5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };