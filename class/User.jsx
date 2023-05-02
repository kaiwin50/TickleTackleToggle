import { db } from "@/config/firebaseSetup"
import { doc, getDoc, onSnapshot } from "firebase/firestore"

class User{
    constructor(){
    }
    startSnapshot(uid, setter){
        onSnapshot(doc(db, 'users', uid), doc => {
            setter({...doc.data(), id: uid})
            console.log('update')
        })
    }
    getUserInfoById(uid){
        const userData = async () => (await getDoc(doc(db, 'users', uid)).data()) 
        return userData
    }
}


export {User};