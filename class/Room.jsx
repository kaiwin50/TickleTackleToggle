const { setDoc, doc, addDoc, collection, serverTimestamp, updateDoc, onSnapshot, deleteDoc } = require("firebase/firestore")
const { db } = require("@/pages/api/firebaseSetup");

export class Room {
    constructor(){
    }
    async createRoom(title){
        const newRoom = await addDoc(collection(db, 'room'), {
            rank: title,
            status: 'waiting for matching.',
            createAt: serverTimestamp()
          })
        return (newRoom)
    }
    addPlayer(roomRef, userRef){
        setDoc(doc(roomRef, 'players', userRef.id), {
            username: userRef.username,
            isReady: false
        })
        updateDoc(doc(collection(db, 'users'), userRef.id), {
            status: 'matching',
            inRoom: roomRef.id
        })
    }
    joinRoom(query, userRef){
        onSnapshot(query, snapshot => {
            snapshot.docs.forEach( queryDoc => {
              updateDoc(doc(db, 'room', queryDoc.id), {
                status: 'ready'
              })
              this.addPlayer(queryDoc, userRef)
            });
        })
    }
    startSnapshot(roomId, setter){
        onSnapshot(doc(db, 'room', roomId), doc => {
            setter({...doc.data(), id: doc.id})
        })
    }
    async destroy(roomId, players){
        try{
            players.forEach(player => {
              updateDoc(doc(db, 'users', player.id), {
                status: 'idle',
                inRoom: ''
              })
              deleteDoc(doc(doc(db, 'room', roomId), 'players', player.id));
          })
          deleteDoc(doc(db, 'room', roomId))
        }
        catch(e){
            console.error(e)
        }
    }
}