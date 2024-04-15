// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmT0lcd3_pTVIwLFvz07dKyTmRbSYBxUY',
  authDomain: 'teste-alvesxdani.firebaseapp.com',
  projectId: 'teste-alvesxdani',
  storageBucket: 'teste-alvesxdani.appspot.com',
  messagingSenderId: '656829799237',
  appId: '1:656829799237:web:0ac40e3e2fbd13bedbfc2c',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }