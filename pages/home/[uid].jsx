import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { useState, useEffect, cloneElement, useRef } from 'react'
import { useRouter } from 'next/router'

import { Chat, ChatContainer } from '@/components/Chat'


const style = css`
  ul{
    list-style-type: none;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin: auto;
  }
  li {
    display: inline-flex;
    margin-left: 1em;
    margin-right: 1em;
  }
  input[name='msg']{
    width: 100%;
    border-radius: .5em;
    border: 1.8px solid #a644a6;
    color: white;
    position: sticky;
    padding: .25em;
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
  const { addDoc, collection, doc, getDoc, updateDoc, onSnapshot, orderBy, query, where, serverTimestamp, getCountFromServer } = require('firebase/firestore');
  
  
  // fetch user data
  const [ userRef, setUserRef ] = useState({})
  const fetchUserData = async () => {
    onSnapshot(doc(db, 'users', uid), doc => {
      setUserRef(doc.data());
    })
  }

  // chat receive message
  
 
  // chat send message
  const [ msg, setMsg ] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    console.log({imgUrl: userRef.imgUrl? userRef.imgUrl : '/profile.png',
    username: userRef.username,
    displayName: userRef.displayname ? userRef.displayname : `anonymous_${userRef.id}`,
    message: msg,
    createAt: serverTimestamp(),
    owner: userRef.id})
    addDoc(collection(db, 'chatMessages'), {
      imgUrl: userRef.imgUrl? userRef.imgUrl : '/profile.png',
      username: userRef.username,
      displayName: userRef.displayname ? userRef.displayname : `anonymous_${userRef.username}`,
      message: msg,
      createAt: serverTimestamp()
    })
    setMsg("");
  }

  // Create Matching Room
  const [players, setPlayers] = useState([])
  const matchingManager = async () => {
    if(userRef.status != 'matching'){
      const q = query(collection(db, 'room'), where('status', '==', 'waiting for matching.'), where('rank', '==', userRef.rank.title))
      const haveRoom = await getCountFromServer(q)
      if(haveRoom.data().count > 0){
        onSnapshot(q, (snapshot) => {
          if(snapshot.docs.length != 0){
            updateDoc(doc(collection(db, 'room'), snapshot.docs[0].id), {
              player2: {
                uid: uid,
                username: userRef.username
              },
              status: 'ready'
            })
            updateDoc(doc(db, 'users', uid), {
              inRoom: snapshot.docs[0].id,
              status: 'matching'
            })
          }
        })
      }
      else{
        const newRoom = addDoc(collection(db, 'room'), {
          player1: {
            uid: uid,
            username: userRef.username
          },
          player2: {
            uid: '',
            username: ''
          },
          rank: userRef.rank.title,
          status: 'waiting for matching.',
          createAt: serverTimestamp()
        })
        updateDoc(doc(collection(db, 'users'), uid), {
          status: 'matching',
          inRoom: (await newRoom).id
        })
        setPlayers(userRef.username);

      }
    }
    fetchPlayerRoom
  }
  
  const [roomRef, setRoomRef] = useState({status: 'none'})

  const fetchPlayerRoom = async () => {
    try{
      onSnapshot(doc(db, 'room', await userRef.inRoom), doc => {
        setRoomRef(doc.data())
        if(roomRef != undefined){
          if(roomRef.status == 'ready'){
            router.push(`/play/${ doc.id }/${ uid }`)
          }
        }
      })
    }catch(e){
      console.log('not valid')
    }
    
    }
  
  const returnHome = () => {
    updateDoc(doc(db, 'users', uid), {
      inRoom: 'none',
      status: 'Online'
    })
  }
  // after loading
  useEffect(()=>{
    if(router.isReady){
      returnHome();
      fetchUserData();
      fetchChatMessages();
  }
  }, [router.isReady])

  const dummy = useRef(null);
  useEffect(()=>{
    dummy.current?.scrollIntoView({behavior: 'smooth'});
  }, [allMsg])
  useEffect(()=>{
    console.log("userRef change")
    fetchPlayerRoom();
  }, [matchingManager])
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
        <Container width="50%" visible={ roomRef? (roomRef.status == 'waiting for matching.'? 'visible' : 'hidden') : 'hidden' }>
          Matching...
        </Container>
        <div className='match-status'>
          <ul>
            {/* {
              players?.map(({username, uid}, index) => (
                <li key={index}><span>player{index}: </span><span>{ username }</span></li>
              ))
            } */}
          </ul>
        </div>
        <ChatContainer>
            { allMsg?.map((chat, index) => {
              return (
              <Chat key={index} msg={ chat.message } displayName={ userRef.username == chat.username? 'me' : chat.displayName } direct={ userRef.username == chat.username ? 'row-reverse': 'row' } url={ chat.imgUrl? chat.imgUrl : '/profile.png' }></Chat>
              )
            })}
          <form onSubmit={ handleSubmit }>
            <input ref={ dummy } name='msg' type="text" value={ msg } onChange={ (e)=>{ setMsg(e.target.value) } } />
          </form>
        </ChatContainer>
      </main>
    </>
  )
}
