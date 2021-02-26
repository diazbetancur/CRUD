import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAwMjNpSybF2Q8HICzkTufGR5L89QHa754",
    authDomain: "crud-bdf0a.firebaseapp.com",
    projectId: "crud-bdf0a",
    storageBucket: "crud-bdf0a.appspot.com",
    messagingSenderId: "875951763957",
    appId: "1:875951763957:web:05c194b2de373fe23470bc"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)