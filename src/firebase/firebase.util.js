import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const config = 
    {
        apiKey: "AIzaSyBnjpKfNgD5WIhlURNvPa9cszC6atbOUiQ",
        authDomain: "crown-db-6d729.firebaseapp.com",
        projectId: "crown-db-6d729",
        storageBucket: "crown-db-6d729.appspot.com",
        messagingSenderId: "142389513437",
        appId: "1:142389513437:web:13d1e50db3bdc37f035f34",
        measurementId: "G-Z9106K7RJE"
      }
firebase.initializeApp(config)
export const firestore = firebase.firestore()

const provider = new GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});


const signInWithGoogle = async() => {
    const auth = getAuth()
    await signInWithPopup(auth, provider)
    .then((result) => {
            const user = result.user;
            console.log(user);
        })
    .catch((err) => {
            console.log(err);
        })
}

export default signInWithGoogle 

