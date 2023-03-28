const { db } = require("@/pages/api/firebaseSetup");
const { onSnapshot, doc, getDoc } = require("firebase/firestore");

class User{
    constructor(){
    }
    startSnapshot(uid, setter){
        onSnapshot(doc(db, 'users', uid), doc => {
            setter({...doc.data(), id: uid})
        })
    }
    getUserInfoById(uid){
        const userData = async () => (await getDoc(doc(db, 'users', uid)).data()) 
        return userData
    }
}

export {User};