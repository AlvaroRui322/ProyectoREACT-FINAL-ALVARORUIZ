import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiNNZnJHMR3h5WCQ1bqDvSJWAVu3Ylm7A",
    authDomain: "creador-de-equipos-pokem-51aa2.firebaseapp.com",
    projectId: "creador-de-equipos-pokem-51aa2",
    storageBucket: "creador-de-equipos-pokem-51aa2.firebasestorage.app",
    messagingSenderId: "1901822251",
    appId: "1:1901822251:web:a1a5ae4ce46831cb01056e",
    measurementId: "G-QSGX48T382"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const login = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const register = ({email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const logOut = () => signOut(auth)

