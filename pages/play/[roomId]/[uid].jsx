import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { useState, useEffect, cloneElement, useRef, useContext } from 'react'
import { useRouter } from 'next/router'

import { Chat, ChatApp, ChatContainer } from '@/components/Chat'
import { UserContext } from '@/pages/home/[uid]'


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
  const { roomId, uid } = router.query;
  
  // import database
  const { db } = require('../../api/firebaseSetup');
  const { addDoc, collection, doc, getDoc, updateDoc, onSnapshot, orderBy, query, where, serverTimestamp, getCountFromServer } = require('firebase/firestore');
  
  // fetch user data
  const [ userRef, setUserRef ] = useState({});
  const fetchUserData = async () => {
    onSnapshot(doc(db, 'users', uid), doc => {
      setUserRef(doc.data());
      console.log('userRef updated!!')
    })
  }

  const endPlay = async ()=>{
    try{
      players.forEach(player => {
        updateDoc(doc(db, 'users', uid), {
          status: 'idle',
          inRoom: ''
        })
        deleteDoc(doc(doc(db, 'room', roomId), 'players', player.id));
    })
    deleteDoc(doc(db, 'room', roomId))
    router.push(`../../home/${ uid }`)
    }
    catch(e){
      console.error(e)
    }
  }

  // after loading
  useEffect(()=>{
    if(router.isReady){
      fetchUserData();
  }
  }, [router.isReady])

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
          playing...
          <Button onClick={ endPlay }>end</Button>
        
        <div>{ ChatApp(userRef, router, roomId) }</div>        
      </main>
    </>
  )
}
