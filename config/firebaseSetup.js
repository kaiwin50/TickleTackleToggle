// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBN0iMvyfxdV5bKdscKafqxgjPImu7HkpA",
  authDomain: "tictactoe-4ec18.firebaseapp.com",
  projectId: "tictactoe-4ec18",
  storageBucket: "tictactoe-4ec18.appspot.com",
  messagingSenderId: "668793574462",
  appId: "1:668793574462:web:d60e68e845ac70239ded6f",
  measurementId: "G-NM0CQHZG15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;