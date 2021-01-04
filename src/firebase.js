import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD2iz_mjS7LaRiBXpC9beQIoUZ3eEcNEkw",
  authDomain: "anloi-challenge-8f8fa.firebaseapp.com",
  projectId: "anloi-challenge-8f8fa",
  storageBucket: "anloi-challenge-8f8fa.appspot.com",
  messagingSenderId: "549228021199",
  appId: "1:549228021199:web:983de56cad2f5f836d7eba",
  measurementId: "G-9NNNJGXH59"
};



const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
