
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "todo-rrf-316-97772.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-97772.firebaseio.com",
    projectId: "todo-rrf-316-97772",
    storageBucket: "todo-rrf-316-97772.appspot.com",
    messagingSenderId: "836563583411",
    appId: "1:836563583411:web:b3848df1498d84a4db0bc6",
    measurementId: "G-56RKMHEHGN"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;
