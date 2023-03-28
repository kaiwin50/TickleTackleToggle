import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { useState, useEffect, cloneElement, useRef } from 'react'
import { useRouter } from 'next/router'

import { Chat, ChatApp, ChatContainer } from '@/components/Chat'

const style = css`
  input[name='msg']{
    width: 100%;
    border-radius: .5em;
    border: 1.8px solid #a644a6;
    color: white;
    position: sticky;
    padding: .25em;
    background-color: black;
  }
  .blurBg{
    width: 40%;
    height: 20%;
    background-color: #a644a6;
    position: absolute;
    border-radius: 50px;
    filter: blur(150px);
    rotate: -30deg;
    top: 30%;
  }
  .blurBg2{
    width: 40%;
    height: 20%;
    background-color: #df6552;
    position: absolute;
    border-radius: 50px;
    filter: blur(120px);
    right: 10%;
  }
  /* width */
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #a644a6; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #a644a6; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d918cf; 
}
.quickMatch{
    width: 15em;
    height: 15em;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,202,65,1) 2%, rgba(221,148,0,1) 100%);
    align-items: center;
    text-align: center;
    border: .4em solid wheat;
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 7.5em;
    transition: .1s;
  }
  .quickMatch:hover{
    background-color: #eecc8c;
    background: radial-gradient(circle, #eaa700 2%, #ffaa00 100%);
    border: .4em solid #bc8319;
    cursor: pointer;
  }
  .quickMatch div{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 4em;
  }

`

export default function Home() {
  // query url data
  const router = useRouter();
  const { uid } = router.query;
  // import database
  const { db } = require('../api/firebaseSetup');
  const { addDoc, collection, doc, getDoc, updateDoc, onSnapshot, limit, query, where, serverTimestamp, getCountFromServer, getDocs, setDoc } = require('firebase/firestore');
  
  const [ userRef, setUserRef ] = useState({})
  const fetchUserData = () => {
    onSnapshot(doc(db, 'users', uid), doc => {
      setUserRef(doc.data());
      console.log('userRef updated!!')
    })
  }


  // Create Room
  const createRoom = async () => {
    const newRoom = await addDoc(collection(db, 'room'), {
          rank: userRef.rank.title,
          status: 'waiting for matching.',
          createAt: serverTimestamp()
        })
        setDoc(doc(newRoom, 'players', uid), {
          username: userRef.username,
          isReady: false
        })
        updateDoc(doc(collection(db, 'users'), uid), {
          status: 'matching',
          inRoom: (newRoom).id
        })
  }

  // Join room
  const joinRoom = (query) => {
    onSnapshot(query, snapshot => {
      snapshot.docs.forEach( queryDoc => {
        console.log(userRef.username)
        console.log(queryDoc.username)
        updateDoc(doc(db, 'room', queryDoc.id), {
          status: 'ready'
        })
        setDoc(doc(doc(db, 'room', queryDoc.id), 'players', uid), {
          username: userRef.username,
          isReady: false
        })
        updateDoc(doc(db, 'users', uid), {
          inRoom: queryDoc.id,
          status: 'matching'
        })
      });
    })
  }

  const matchingManager = async () => {
    console.log("matchingManager run")
    const valid = userRef.status == 'idle' ? true : false;
    if(valid){
      const q = query(collection(db, 'room'), where('status', '==', 'waiting for matching.'), where('rank', '==', userRef.rank.title), limit(1))
      const haveRoom = await getCountFromServer(q)
      if(haveRoom.data().count > 0){
        joinRoom(q)
        console.log('joined room')
      }
      else{
        createRoom()
        console.log('create room')
      }
      console.log('Matching end')
   }
  }
  const roomInit = {
    status: 'waiting for matching.', player1: {username: 'none', uid: ''}, player2: {username: 'none', uid: ''}
  }
  const [roomRef, setRoomRef] = useState(roomInit)
  const fetchPlayerRoom = (roomId) => {
      onSnapshot(doc(db, 'room', roomId), doc => {
        setRoomRef({...doc.data(), id: doc.id})
      })
      console.table(roomRef)
    }
  // after loading
  useEffect(()=>{
    if(router.isReady){
      fetchUserData();
  }
  }, [router.isReady])

  useEffect(()=>{
    const fetchRoomId = async () => {
      try{
        const userDoc = (await getDoc(doc(db, 'users', uid))).data()
        fetchPlayerRoom(userDoc.inRoom)
      }
      catch (e) {
        console.warn("still doesn't has room")
      }
    }
    fetchRoomId()
  }, [userRef.inRoom])

  const userReady = () => {
    updateDoc(doc(doc(db, 'room', userRef.inRoom), 'players', uid), {
      isReady: true
    })
  }
  const reset = async ()=>{
    await updateDoc(doc(db, 'users', uid), {
      status: 'idle',
      inRoom: ''
    })
    // router.reload()
  }
  const [players, setPlayers] = useState([])
  const fetchUserInRoom = async () => {
    try{
      onSnapshot(collection(doc(db, 'room', roomRef.id), 'players'), snapshot => {
        setPlayers(snapshot.docs);
      });
    }
    catch(e){
      console.warn("still doesn't has room")
    }
  }
  useEffect(()=>{
    if(userRef.inRoom != ''){
      fetchUserInRoom()
    }
  }, [roomRef])

  const isPlayersReady = async () => {
    try{
      const q = query(collection(doc(db, 'room', roomRef.id), 'players'), where('isReady', '==', true))
      const countReady = await getCountFromServer(q)
      console.log(countReady.data().count)
      if(countReady.data().count == 2){
        router.replace(`../play/${ roomRef.id }/${ uid }`);
      }
    }
    catch (e){
      console.log(e)
    }
  }
  useEffect(()=>{
    isPlayersReady()
  }, [players])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{ style }</style>
      </Head>
      <main className={styles.main}>
        <div className='blurBg'></div>
        <div className='blurBg2'></div>
        <Container width="80%">
        <h1>{ userRef.username }</h1>
        </Container>
        <div className='quickMatch' onClick={matchingManager}>
          <div>Quick Match</div>
        </div>
        <Container width="50%" visible={ userRef.status == 'matching'? 'visible' : 'hidden' }>
          Matching...<br/>
          <Container visible= { players[0] != undefined ? 'visble' : 'hidden'}> { userRef.inRoom != '' ? players[0]?.data().username : null }
          </Container>
          <Container visible= { players[1] != undefined ? 'visible' : 'hidden' }> { userRef.inRoom != '' ? players[1]?.data().username : null }
          </Container>
          <Button onClick={ userReady }>Ready</Button>
          <Button onClick={ reset }>Cancel</Button>

        </Container>
        <Button onClick={ reset }>reset</Button>
        <div className='match-status'>
          <ul>
            {/* {
              players?.map(({username, uid}, index) => (
                <li key={index}><span>player{index}: </span><span>{ username }</span></li>
              ))
            } */}
          </ul>
        </div>
        { ChatApp(userRef, router, 'homePage') }
      </main>
    </>
  )
}
