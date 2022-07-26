import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { 
    getAuth, 
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';


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

provider.setCustomParameters({
    prompt: 'select_account'
});

const auth = getAuth();

export const signInWithGoogle = async() => await signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef)
    
    

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch(error){
            console.log('error creating a user ', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = (email, password) => {
    if (!email || ! password) return;
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword =  (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}