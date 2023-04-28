import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container,ContainerFluid } from '@/components/Container'
import { Button } from '@/components/Button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProgressBar } from  'react-loader-spinner'
import { ChatApp,ChatLetter } from '@/components/Chat'
import { User } from '@/class/User'
import { Room } from '@/class/Room'
import auth from './api/auth'
import { dongle, heyComic } from '@/components/Font'
import { Picture,Background } from '@/components/Image'
import match_bg from '../public/Img/match_bg.png'

const style = css`
  /* input[name='msg']{
    width: 100%;
    border: 1.8px solid #a644a6;
    color: white;
    position: sticky;
    background-color: black;
  } */

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
.quick-match{
    width: 15em;
    height: 15em;
    border-radius: 50%;
    align-items: center;
    text-align: center;
    position: absolute;
    right: 10em;
    bottom: 0;
    margin: 7.5em;
    background: #FF6839;
    border: 2px solid #000000;
    box-shadow: inset -5px 1px 10px 5px rgba(0, 0, 0, 0.5);
    transition: .1s;
  }
  .quick-match:hover{
    background-color: #de3500;
    cursor: pointer;
  }
  .quick-match div{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 5em;
  }

  .small-btn{
    width: 10em;
    height: 10em;
    margin: 2.5em;
    right: 2em;
    bottom : 10em;
    border-radius: 50%;
    align-items: center;
    text-align: center;
    position: absolute;
    background: #ECD352;
    border: 2px solid #000000;
    box-shadow: inset -5px 1px 10px 5px rgba(0, 0, 0, 0.3);
  }
  .small-btn:hover{
    background-color: #e8c305;
    cursor: pointer;
  }
  .small-btn div{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 2em;
    color : black;
  }
  .rank {
    right: 7em;
    bottom : -1em;
  }
  .profileP {
    position : absolute;
    top : 0em;
    left : 0em;
    width : 22.5em;
    height:7.5em;
    background-color:white;
    box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.25);
    border-bottom-right-radius: 40px;
    color : black;
  }
  .profileP h1 {
    position:absolute;
    bottom :2em;
    right:5em;
  }
  .profileP .player_status {
    right:4.7em;
    bottom :.5em;
  }
  .leader-btn {
    position : absolute;
    top : 8em;
    right : 0em;
    width : 20em;
    height:4em;
    background: #ECC94B;
    box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);  
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    color : black;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .leader-btn h1 {
    width:100%;
    display:flex;
    justify-content:end;
    margin-right:1.5em;
    font-size:2.5em;
  }
  .leader-btn:hover{
    background-color: #e8c305;
    cursor: pointer;
  }
  .friend-btn {
    position : absolute;
    bottom : 0em;
    left : 0em;
    width : 25em;
    height:4em;
    background: #ECC94B;
    box-shadow: 8px 6px 4px rgba(0, 0, 0, 0.25);
    border-top-right-radius: 30px;
    color : black;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .friend-btn h1 {
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:2.5em;
  }
  .friend-btn:hover{
    background-color: #e8c305;
    cursor: pointer;
  }
  

  .matching h1{
    color: white;
    width: 40%;
    right:0;
    top:40%;
    font-size:4em;
    visibility: ${ props => props.visible || 'visible'};
    position:absolute;
    z-index: 2;
    font-size : 5em;
    text-shadow: 1.5px 1.5px 0 #000,
        -1.5px 1.5px 0 #000,
        1.5px -1.5px 0 #000,
        -1.5px -1.5px 0 #000,
        0px 1.5px 0 #000,
        0px -1.5px 0 #000,
        -1.5px 0px 0 #000,
        1.5px 0px 0 #000,
        3px 3px 0 #000,
        -3px 3px 0 #000,
        3px -3px 0 #000,
        -3px -3px 0 #000,
        0px 3px 0 #000,
        0px -3px 0 #000,
        -3px 0px 0 #000,
        3px 0px 0 #000,
        1.5px 3px 0 #000,
        -1.5px 3px 0 #000,
        1.5px -3px 0 #000,
        -1.5px -3px 0 #000,
        3px 1.5px 0 #000,
        -3px 1.5px 0 #000,
        3px -1.5px 0 #000,
        -3px -1.5px 0 #000, 6px 9px 4px rgba(0, 0, 0, 0.3);
  }
  .player_match_label{
    color:#FF6839;
    font-size:3em;
    height:0em;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
  }
  .player_match_label p {
    width:100%;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
    height:1em;
  }
  .player_match_name {
    font-size:.75em;
  }
  
`
// initial room data use for escape error when some variable is unload.
const roomInit = {
  status: 'waiting for matching.', player1: { username: 'none', uid: '' }, player2: { username: 'none', uid: '' }
}


export default function Home() {
  const [uid, setUid] = useState('');
  // query url data
  const router = useRouter();
  // import database.
  const { db } = require('./api/firebaseSetup');
  const { collection, doc, getDoc, updateDoc, onSnapshot, limit, query, where, getCountFromServer } = require('firebase/firestore');
  // user refference : use as refference of realtime update user info.
  const [userRef, setUserRef] = useState({})
  const user = new User();
  // condition on load: use for escape from error when uid is unreaded.
  useEffect(() => {
    try {
      setUid(auth.currentUser.uid)
      user.startSnapshot(uid, setUserRef);
    }
    catch (e) {
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log('user: ', user)
          setUid(user.uid)
          onSnapshot(doc(db, 'users', user.uid), userInfo => {
            setUserRef({ ...userInfo.data(), id: userInfo.id })
            const data = userInfo.data();
            console.log(data)
            if (data.inRoom != '') {
              console.log('is in room ', data.inRoom)
              room.subscribe(data.inRoom, setRoomRef, setPlayers);
              console.log(roomRef, players)
            }
            if (data.status == 'idle') {
              router.push('home');
            }
            else if (data.status == 'playing') {
              router.push(`../play/${data.inRoom}`);
            }
          })
        }
        else {
          console.log(null);
        }
      })
    }
  }, [])

  // room class general room function.
  const room = new Room();
  // const [rid, setRid] = useState();

  // Matching Manager.
  const matchingManager = async () => {
    console.log("matchingManager run")
    const valid = userRef.status == 'idle' ? true : false;
    if (valid) {
      const q = query(collection(db, 'room'), where('status', '==', 'waiting for matching.'), where('rank', '==', userRef.rank.title), where('isFull', '==', false), limit(1))
      const haveRoom = await getCountFromServer(q)
      console.log(haveRoom.data().count);
      if (haveRoom.data().count > 0) {
        const rid = await room.getRoomId(q);
        console.log('rid: ', rid)
        room.addPlayer(doc(db, 'room', rid), userRef);
        room.subscribe(rid, setRoomRef, setPlayers);
        console.log('joined room')
      }
      else {
        const newRoom = await room.create(userRef.rank.title);
        room.addPlayer(newRoom, userRef);
        room.subscribe(newRoom.id, setRoomRef, setPlayers);
        console.log('create room')
      }
      console.log('Matching end')
    }
  }
  // room refference that look up change realtime on the current room.
  const [roomRef, setRoomRef] = useState(roomInit)
  // the fetch function delay on updating for some reason. So I manually get it with getDoc and await.   
  // useEffect(() => {
  //   const fetchRoomId = async () => {
  //     try {
  //       const userDoc = (await getDoc(doc(db, 'users', uid))).data()
  //       room.subscribe(userDoc.inRoom, setRoomRef);
  //     }
  //     catch (e) {
  //       // indexOf Error for sometimes the doc is never exist or no longer exist.
  //       console.warn("still doesn't has room")
  //     }
  //   }
  //   fetchRoomId()
  // }, [userRef.inRoom])

  // get confirm from user if they want to play the match
  const userReady = () => {
    updateDoc(doc(doc(db, 'room', userRef.inRoom), 'players', uid), {
      isReady: true
    })
  }
  const createRoom = async () => {
    const newRoom = await room.create(userRef.rank.title, false)
  }
  // all players in the current room
  const [players, setPlayers] = useState([])
  const fetchUserInRoom = async () => {
    try {
      onSnapshot(collection(doc(db, 'room', roomRef.id), 'players'), snapshot => {
        setPlayers(snapshot.docs);
      });
    }
    catch (e) {
      console.warn("still doesn't has room")
    }
  }
  useEffect(() => {
    if (userRef.inRoom != '') {
      fetchUserInRoom()
    }
  }, [roomRef])


  const destroyRoom = () => (room.destroy(userRef.inRoom, players))
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{style}</style>
      </Head>
      <main id='re' className={styles.main}>
        <div className='profileP'>
          <div className='profileImg'></div>
          <h1 className={dongle.className}>{userRef.username} </h1>
          <h1 className={[dongle.className, "player_status"].join(" ")}>status </h1>

        </div>
        <div className='quick-match' onClick={matchingManager}>
          <div className={dongle.className}>Match</div>
        </div>
        <div className='small-btn' onClick={matchingManager}>
          <div className={dongle.className}>Create{"\n"}Room</div>
        </div>
        <div className='small-btn rank' onClick={matchingManager}>
          <Picture src={"/Img/fire.png"} width="7em" top="6.25em" right="1.5em"></Picture>
          <div className={dongle.className}>Rank</div>
        </div>
        <div className='leader-btn'>
          <Picture src={"/Img/hand1.png"} width="3.5em" top=".1em" left="2em"></Picture>
          <h1 className={dongle.className}>Leader Board</h1>
        </div>
        <div className='friend-btn'>
          <Picture src={"/Img/hand3.png"} width="3.2em" top=".1em" right="6em"></Picture>
          <h1 className={dongle.className}>Friends</h1>
        </div>
        
        <Button onClick={destroyRoom}>reset</Button>
        {ChatApp(userRef, router, 'homePage')}
        <ChatLetter className={dongle.className} left=".75em" transform="rotate(-18.73deg)">C</ChatLetter>
        <ChatLetter className={dongle.className} left="1.25em" transform="rotate(-13.91deg)">h</ChatLetter>
        <ChatLetter className={dongle.className} left="1.75em" transform="rotate(7.27deg)">a</ChatLetter>
        <ChatLetter className={dongle.className} left="2.25em" transform="rotate(-8deg)">t</ChatLetter>
        <Picture src={"/Img/chat_mouth.png"} width="4.5em" top="36%" left="16em"></Picture>

        <ContainerFluid className="matching" width="100vw" height="100vh" visible={userRef.status == 'matching' ? 'visible' : 'hidden'}>
          <Background visible={players[0] != undefined ? 'visible' : 'hidden'} src={"/Img/match_bg.png"}></Background>
          <h1 visible={players[0] != undefined ? 'hidden' : 'visible'} className={dongle.className}>Matching...</h1>

          <Container color="transparent" visible={players[0] != undefined ? 'visible' : 'hidden'} width="40%" padding="0em" height="60%"> 
          <Container className={dongle.className} visible={players[0] != undefined ? 'visible' : 'hidden'} width="50%" height="100%" color="white" border="3px solid #000000" shadow="0px 9px 4px rgba(0, 0, 0, 0.35)">
            <h2 className="player_match_label"><p>Player 1 </p><p className='player_match_name'>{userRef.inRoom != '' ? players[0]?.data().username : null}</p></h2></Container>
          </Container>

          <Container color="transparent" visible={players[1] != undefined ? 'visible' : 'hidden'} width="20%"> 
            <Picture src={"/Img/vs.png"} visible={players[1] != undefined ? 'visible' : 'hidden'} width="10em" top="-2em" left="4em" transform="rotate(12.1deg)"></Picture>
          </Container>
          
          <Container zindex="3" color="transparent" visible={players[1] != undefined ? 'visible' : 'hidden'} width="40%" padding="0em" height="60%">
            <Container className={dongle.className} visible={players[1] != undefined ? 'visible' : 'hidden'} width="50%" height="100%" color="white" border="3px solid #000000" shadow="0px 9px 4px rgba(0, 0, 0, 0.35)">
            <h2 className="player_match_label"><p>Player 2</p><p className='player_match_name'>{userRef.inRoom != '' ? players[1]?.data().username : null}</p></h2></Container>
          </Container>
          <Button  onClick={userReady} visible={players[1] != undefined ? 'visible' : 'hidden'}>Ready </Button>
          <Button onClick={destroyRoom} visible={players[0] != undefined ? 'visible' : 'hidden'}>Cancel</Button>
        </ContainerFluid>
      </main>
    </>
  )
}
