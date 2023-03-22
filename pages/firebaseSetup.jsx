// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const  { getFirestore } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB_jU3ZQ3ALnbTmCb7j7H837TlJ-fy64oQ",
  authDomain: "tickletackletoggle.firebaseapp.com",
  databaseURL: "https://tickletackletoggle-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tickletackletoggle",
  storageBucket: "tickletackletoggle.appspot.com",
  messagingSenderId: "854577270606",
  appId: "1:854577270606:web:b6bc3b049173e4c8d1981f",
  measurementId: "G-8TFRCPFNQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);