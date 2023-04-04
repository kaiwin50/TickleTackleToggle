const { setDoc, doc, addDoc, collection, serverTimestamp, updateDoc, onSnapshot, deleteDoc, getDocs } = require("firebase/firestore")
const { db } = require("@/pages/api/firebaseSetup");

export class Room {
    constructor() {
    }
    async create(title, matching = true) {
        const newRoom = await addDoc(collection(db, 'room'), {
            rank: title,
            status: matching ? 'waiting for matching.' : 'idle',
            createAt: serverTimestamp()
        })
        return (newRoom)
    }
    addPlayer(roomRef, userRef) {
        setDoc(doc(roomRef, 'players', userRef.id), {
            username: userRef.username,
            isReady: false
        })
        updateDoc(doc(collection(db, 'users'), userRef.id), {
            status: 'matching',
            inRoom: roomRef.id
        })
    }
    async getRoomId(query) {
        console.log('r1')
        var rid;
        (await getDocs(query)).docs.forEach(doc =>{
            console.log(doc.id)
            rid = doc.id
        })
        return rid
    }
    subscribe(roomId, setter) {
        onSnapshot(doc(db, 'room', roomId), doc => {
            setter({ ...doc.data(), id: doc.id })
        })
    }
    async destroy(roomId, players) {
        try {
            players.forEach(player => {
                updateDoc(doc(db, 'users', player.id), {
                    status: 'idle',
                    inRoom: ''
                })
                deleteDoc(doc(doc(db, 'room', roomId), 'players', player.id));
            })
            deleteDoc(doc(db, 'room', roomId))
        }
        catch (e) {
            console.error(e)
        }
    }
}