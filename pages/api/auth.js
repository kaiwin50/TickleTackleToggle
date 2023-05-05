import { auth, db } from '@/config/firebaseSetup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const SignIn = (email, password, router) => {
    signInWithEmailAndPassword(auth, email, password).then( userCredential => {
        const user = userCredential.user;
        console.log(user.uid);
        router.push('/home');
    } ).catch(e => {
            console.error(e.message);
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




export default auth;