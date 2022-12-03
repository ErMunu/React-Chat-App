import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCVXhwmq705CPE455smvUXY2wYgOyA-xBE",
    authDomain: "react-chat-app-cab52.firebaseapp.com",
    projectId: "react-chat-app-cab52",
    storageBucket: "react-chat-app-cab52.appspot.com",
    messagingSenderId: "797511151173",
    appId: "1:797511151173:web:57c0fb138b7d22ab53fd2c",
    measurementId: "G-B1MR9B58CG"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };

export default db;
