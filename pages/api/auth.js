import { auth, db } from '@/config/firebaseSetup';
import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

export const SignIn = (email, password, router) => {
    setPersistence(auth, browserSessionPersistence).then(() => {
        if(auth.currentUser){
            updateDoc(doc(db, 'users', auth.currentUser.uid), {
                status: 'offline',
                inRoom: ''
            })
        }
        return ((signInWithEmailAndPassword(auth, email, password).then( userCredential => {
        const user = userCredential.user;
        console.log(user.uid);
        updateDoc(doc(db, 'users', user.uid), {
            status: 'idle',
            inRoom: ''
        })
        router.push('/home');
    } ).catch(e => {
            console.error(e.message);
    })))
    })
    
}
export const SignUp = (email, username, password, router) => {
    createUserWithEmailAndPassword(auth, email, password).then( userCredential => {
        const user = userCredential.user;
        setDoc(doc(db, 'users', user.uid), {
            username: username,
            email: email,
            rank: {
              title: "koy",
              point: 0
            },
            status: "idle"
          })
          router.push('.');
    } ).catch(e => {
        console.error(e.message)
    })
}

export const SignOut = (router) => {
    const earlyUser = auth.currentUser.uid
    signOut(auth).then(()=>{
        updateDoc(doc(db, 'users', earlyUser), {
            status: 'offline',
            inRoom: ''
        })
        router.replace('.')
    })
}


export default auth;