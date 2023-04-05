const { setDoc, doc, addDoc, collection, serverTimestamp, updateDoc, onSnapshot, deleteDoc, getDocs, query, getCountFromServer, where } = require("firebase/firestore")
const { db } = require("@/pages/api/firebaseSetup");

export class Room {
    constructor() {
    }
    async create(title, matching = true) {
        const newRoom = await addDoc(collection(db, 'room'), {
            rank: title,
            status: matching ? 'waiting for matching.' : 'idle',
            createAt: serverTimestamp(),
            isFull: false
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
        (await getDocs(query)).docs.forEach(doc => {
            console.log(doc.id)
            rid = doc.id
        })
        return rid
    }
    subscribe(rid, setter, setPlayers, setBoard) {
        if (setter) {
            onSnapshot(doc(db, 'room', rid), async (snapshot) => {
                setter({ ...snapshot.data(), id: snapshot.id })
                const q = query(collection(doc(db, 'room', rid), 'players'))
                const playersNum = await getCountFromServer(q)
                if (playersNum.data().count == 2) {
                    updateDoc(doc(db, 'room', rid), {
                        isFull: true
                    })
                }
            })
        }
        if (setPlayers) {
            onSnapshot(collection(doc(db, 'room', rid), 'players'), async (snapshot) => {
                try{
                    const qReady = query(collection(doc(db, 'room', rid), 'players'), where('isReady', '==', true));
                const playersReady = await getCountFromServer(qReady)
                console.log('ready: ', playersReady.data().count)
                const isBothReady = playersReady.data().count == 2;
                setPlayers([])
                snapshot.docs.forEach(playerDoc => {
                    setPlayers(old => ([...old, playerDoc]))
                    if (isBothReady) {
                        console.log('isBothReady: ', isBothReady)
                        updateDoc(doc(doc(db, 'room', rid), 'players', playerDoc.id), {
                            isReady: false
                        })
                        updateDoc(doc(db, 'users', playerDoc.id), {
                            status: 'playing'
                        })
                        updateDoc(doc(db, 'room', rid), {
                            status: 'playing'
                        })
                        this.start(rid, snapshot)

                    }
                })
                }
                catch(e){
                    console.error('room deleted');
                }
            })
        }
        if (setBoard) {
            onSnapshot(collection(doc(db, 'room', rid), 'board'), snapshot => {
                const newData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                setBoard(newData)
            })
        }
    }
    start(rid, playerSnap) {
        (['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8']).forEach((value) => {
            setDoc(doc(doc(db, 'room', rid), 'board', value), {
                value: '',
                card: ''
            })
        })
        updateDoc(doc(db, 'room', rid), {
            turn: 'O',
            winner: ''
        })
        playerSnap.docs.forEach((docRef, index) => {
            updateDoc(doc(doc(db, 'room', rid), 'players', docRef.id), {
                role: index ? 'O' : 'X'
            })
        })
    }
    subscribeUser(rid, uid, setter){
        onSnapshot(doc(doc(db, 'room', rid), 'players', uid), snapshot => {
            setter(snapshot.data());
        })
        
    }

}