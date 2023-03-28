import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { ChatApp } from '@/components/Chat'
import { User } from '@/class/User'
import { Room } from '@/class/Room'

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
// initial room data use for escape error when some variable is unload.
const roomInit = {
  status: 'waiting for matching.', player1: {username: 'none', uid: ''}, player2: {username: 'none', uid: ''}
}

export default function Home() {
  // query url data
  const router = useRouter();
  const { uid } = router.query;
  // import database.
  const { db } = require('../api/firebaseSetup');
  const { collection, doc, getDoc, updateDoc, onSnapshot, limit, query, where, getCountFromServer, deleteDoc, } = require('firebase/firestore');
  // user refference : use as refference of realtime update user info.
  const [ userRef, setUserRef ] = useState({})
  const user = new User();

// condition on load: use for escape from error when uid is unreaded.
  useEffect(()=>{
    if(router.isReady){
      user.startSnapshot(uid, setUserRef);
  }
  }, [router.isReady])

  // room class general room function.
  const room = new Room();
  // Matching Manager.
  const matchingManager = async () => {
    console.log("matchingManager run")
    const valid = userRef.status == 'idle' ? true : false;
    if(valid){
      const q = query(collection(db, 'room'), where('status', '==', 'waiting for matching.'), where('rank', '==', userRef.rank.title), limit(1))
      const haveRoom = await getCountFromServer(q)
      if(haveRoom.data().count > 0){
        room.joinRoom(q, userRef)
        console.log('joined room')
      }
      else{
        const newRoom = await room.createRoom(userRef.rank.title); 
        room.addPlayer(newRoom, userRef);
        console.log('create room')
      }
      console.log('Matching end')
   }
  }
  // room refference that look up change realtime on the current room.
  const [roomRef, setRoomRef] = useState(roomInit)
  // the fetch function delay on updating for some reason. So I manually get it with getDoc and await.   
  useEffect(()=>{
    const fetchRoomId = async () => {
      try{
        const userDoc = (await getDoc(doc(db, 'users', uid))).data()
        room.startSnapshot(userDoc.inRoom, setRoomRef);
      }
      catch (e) {
        // indexOf Error for sometimes the doc is never exist or no longer exist.
        console.warn("still doesn't has room")
      }
    }
    fetchRoomId()
  }, [userRef.inRoom])

  // get confirm from user if they want to play the match
  const userReady = () => {
    updateDoc(doc(doc(db, 'room', userRef.inRoom), 'players', uid), {
      isReady: true
    })
  }

  // all players in the current room
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
  // Check if both of them are ready an redirect to play area.
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
      console.error(`TypeError: Cannot read properties of undefined (reading 'indexOf')`)
    }
  }
  useEffect(()=>{
    isPlayersReady()
  }, [players])

  const destroyRoom = () => (room.destroy(userRef.inRoom, players))
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
        <div className='quickMatch createX' onClick={matchingManager}>
          <div>Quick Match</div>
        </div>
        <Container width="50%" visible={ userRef.status == 'matching'? 'visible' : 'hidden' }>
          Matching...<br/>
          <Container visible= { players[0] != undefined ? 'visble' : 'hidden'}> { userRef.inRoom != '' ? players[0]?.data().username : null }
          </Container>
          <Container visible= { players[1] != undefined ? 'visible' : 'hidden' }> { userRef.inRoom != '' ? players[1]?.data().username : null }
          </Container>
          <Button onClick={ userReady }>Ready</Button>
          <Button onClick={ destroyRoom }>Cancel</Button>

        </Container>
        <Button onClick={ destroyRoom }>reset</Button>
        { ChatApp(userRef, router, 'homePage') }
      </main>
    </>
  )
}
