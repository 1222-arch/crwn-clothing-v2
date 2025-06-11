import {initializeApp} from 'firebase/app';
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,

    

} from 'firebase/auth'

import {
    getFirestore,
    doc, 
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore'

import { Category } from '../../store/categories/categories.types';

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
  
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup =  ()=>
    signInWithPopup(auth,googleProvider);
 
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth,googleProvider)



export const db = getFirestore();

export type ObjectToAdd ={
      title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd > (
    collectionKey: string ,
    objectsToAdd : T[],
    ) : Promise<void>=>{
      const collectionRef = collection(db,collectionKey);
      const batch = writeBatch(db);

      objectsToAdd.forEach((object)=>{
        const docRef= doc(collectionRef , object.title.toLowerCase());
        batch.set(docRef , object)
      });

      await batch.commit();
      console.log('done');


}   
   export const getCategoriesAndDocuments = async():Promise<Category[]> =>{
      const collectionRef = collection(db,'categories');
      const q = query(collectionRef);
     
       const querySnapshot = await getDocs(q);
       return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
   
   }

  export type additionalInformation = {
    displayName ?:string;

  }
export type UserData = {
    CreatedAt : Date;
    displayName : string;
    email : string;
}

export const createUserDocumentFromAuth =  async (
    userAuth:User, 
    additionalInformation ={} as additionalInformation
 ) : Promise<void | QueryDocumentSnapshot<UserData>  >    =>{
     if(!userAuth) return;
   
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
            ...additionalInformation,
        })
        }catch (error){
            console.log('err creating the user ', error);
        }
     }

     //if user data exits

     //return userDocRef;
    // return await getDoc(userDocRef);
       return userSnapshot as QueryDocumentSnapshot<UserData>;

     //if user data not exit
} 

 
export const createAuthUserWithEmailAndPassword = async(email:string,password:string)=>{
    if(!email || !password) return ;
   return await  createUserWithEmailAndPassword(auth,email,password) 
}


export const signInAuthUserWithEmailAndPassword = async(email:string,password:string)=>{
    if(!email || !password) return ;
   return await  signInWithEmailAndPassword(auth,email,password) 
}

 
 export const  signOutUser = async ()=>await signOut(auth);

 export const onAuthStateChangedListener = (callback: NextOrObserver<User>)=>
     onAuthStateChanged(auth,callback)



 export const getCurrentUser = (): Promise<User| null>=>{

    return new Promise((resolve,reject)=>{
         const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject

         )

    })
 }
   

 