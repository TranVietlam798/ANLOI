import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC9oWWlzN0IRmNXmn0ngYFZJfz4HIoFc8I",
  authDomain: "anloi-challenge.firebaseapp.com",
  projectId: "anloi-challenge",
  storageBucket: "anloi-challenge.appspot.com",
  messagingSenderId: "691641905142",
  appId: "1:691641905142:web:62c081e4105a619e7921d7",
  measurementId: "G-S749SJS2VG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
