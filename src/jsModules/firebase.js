import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

firebase.initializeApp({ 
  apiKey: "API_KEY",
  authDomain: "DOMAIN",
  databaseURL: "URL",
  projectId: "ID",
  storageBucket: "BUCKET",
  messagingSenderId: "SENDER_ID"
});

export default firebase;