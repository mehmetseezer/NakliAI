import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBQIYNddBhIwG40TjVIyYDT8lbEDlO0kmo",
    authDomain: "nakliai.firebaseapp.com",
    projectId: "nakliai",
    storageBucket: "nakliai.firebasestorage.app",
    messagingSenderId: "429704711734",
    appId: "1:429704711734:web:70ec685388b88f00869297",
    measurementId: "G-E3GDYZRCMQ"
};

const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };