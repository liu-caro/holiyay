import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC8etf2yFJ2btoxrQqFmC2HV5xmlcqPPOA",
    authDomain: "holiyay-3cedb.firebaseapp.com",
    databaseURL: "https://holiyay-3cedb.firebaseio.com",
    projectId: "holiyay-3cedb",
    storageBucket: "holiyay-3cedb.appspot.com",
    messagingSenderId: "443481914824",
    appId: "1:443481914824:web:46a255edbc4c11714794fd",
    measurementId: "G-7R6L9GTWYV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;