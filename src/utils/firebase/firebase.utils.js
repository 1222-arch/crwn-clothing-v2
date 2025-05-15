import {initializeApp} from 'firebase/app';
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

import {
    getFirestore,
    doc, 
    getDoc,
    setDoc,
} from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyBsRILoFbn-108QzFGtayVndnKbXILqczw",
    authDomain: "crwn-clothing-db-79049.firebaseapp.com",
    projectId: "crwn-clothing-db-79049",
    storageBucket: "crwn-clothing-db-79049.firebasestorage.app",
    messagingSenderId: "78934266728",
    appId: "1:78934266728:web:5d5faf93276567d3d7fcdd"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup=  ()=>signInWithPopup(auth,provider)

export const db = getFirestore();

export const createUserDocumentFromAuth =  async (userAuth)=>{
     const userDocRef = doc(db,'users',userAuth.uid);

    console.log(userDocRef);

    const userSnapshot= await getDoc(userDocRef);
     console.log(userSnapshot);
     console.log(userSnapshot.exists());

     if(!userSnapshot.exists()){
        const {displayName,email}= userAuth;
        const createAt = new Date();
       
        try{
        await setDoc(userDocRef,{
            displayName,
            email,
            createAt,
        })
        }catch (error){
            console.log('err creating the user ', error.message);
        }
     }

     //if user data exits

     return userDocRef


     //if user data not exit
} 