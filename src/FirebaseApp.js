import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';  // <----
let firebaseApp;
SetupFirebase();

/**
* Firebase Initialization Function
* This must be called before any firebase query
*/
function SetupFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCXNIOrdQv_SHClUio_acSPPwBxnOqXOHQ",
        authDomain: "vivek-ebe0e.firebaseapp.com",
        projectId: "vivek-ebe0e",
        storageBucket: "vivek-ebe0e.appspot.com",
        messagingSenderId: "205041680078",
        appId: "1:205041680078:web:2fb57dd1f2c4ed83ecda9f",
        measurementId: "G-GFHBWDZ6ZC"
    };
    // Initialize Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebaseApp;