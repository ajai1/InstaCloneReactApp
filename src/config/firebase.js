import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDuyljS_Sk92snUsuwEQz-XsV3FBTXRbIA",
  authDomain: "insta-clone-2e34c.firebaseapp.com",
  databaseURL: "https://insta-clone-2e34c.firebaseio.com",
  projectId: "insta-clone-2e34c",
  storageBucket: "insta-clone-2e34c.appspot.com",
  messagingSenderId: "607288418891",
  appId: "1:607288418891:web:2f74e02360c7bcd7e523ce",
  measurementId: "G-37795NT29H",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
