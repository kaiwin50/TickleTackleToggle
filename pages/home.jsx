import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container, ContainerFluid } from '@/components/Container'
import { Button as BTN4 } from '@/components/Button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChatApp, ChatLetter } from '@/components/Chat'
import { User } from '@/class/User'
import { Room } from '@/class/Room'
import auth, { SignOut } from './api/auth'
import { dongle, heyComic } from '@/components/Font'
import { Picture, Background, PictureFlex } from '@/components/Image'
import Link from 'next/link'
import texture1 from '../public/Img/bg_texture1.png'
import { db } from '@/config/firebaseSetup'
import { collection, doc, getDoc, updateDoc, onSnapshot, limit, query, where, getCountFromServer, deleteDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'
import Matching from '@/components/Matching'
import { Avatar, Flex, Text } from '@chakra-ui/react';

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
    right:17.5%;
    top:20%;
    font-size:4em;
    visibility: ${props => props.visible || 'visible'};
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
    margin-top:-2em;
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
  .mon2{
    margin-top:-3.5em
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [friendReqNum, setFriendReqNum] = useState(0) 
  // user refference : use as refference of realtime update user info.
  const [userRef, setUserRef] = useState({})
  const [inviteRef, setInviteRef] = useState([])
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
          onSnapshot(doc(db, 'users', user.uid), async (userInfo) => {
            setUserRef({ ...userInfo.data(), id: userInfo.id })
            const data = userInfo.data();
            // console.log(data.status)
            // if (data.inRoom != '' && data.status == 'matching') {
            //   console.log('is in room ', data.inRoom)
            //   room.subscribe(data.inRoom, setRoomRef, setPlayers);
            //   console.log(roomRef, players)
            // }
            if (data.status == 'idle') {
              router.push('/home');
            }
            else if (data.status == 'playing') {
              router.push(`/play/${data.inRoom}`);
            }
          })
          onSnapshot(collection(doc(db, 'users', user.uid), 'invite'), inviteDoc => {
              onOpen();
              setInviteRef(inviteDoc.docs.map(fr => ({ ...fr.data(), id: fr.id })))
          });
          onSnapshot(collection(doc(db, 'users', user.uid), 'request'), async () => {
            const q = query(collection(doc(db, 'users', user.uid), 'request'));
            const qCount = await getCountFromServer(q)
            setFriendReqNum(qCount.data().count)
          })
        }
        else {
          console.log(null);
        }
      })
    }
  }, [])

  const acceptInv = (id, invRid) => {
    deleteDoc(doc(doc(db, 'users', userRef.id), 'invite', id));
    room.addPlayer(doc(db, 'room', invRid), userRef, 'in room')
    router.push({
      pathname: '/createRoom/[rid]',
      query: {
        rid: invRid
      }
    })
  }
  const rejectInv = (id) => {
    deleteDoc(doc(doc(db, 'users', userRef.id), 'invite', id));
  }

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

  const createRoom = async () => {
    const newRoom = await room.create(userRef.rank.title, false, userRef.id)
    room.addPlayer(doc(db, 'room', newRoom.id), userRef, 'in room')
    router.push({
      pathname: '/createRoom/[rid]',
      query: {
        rid: newRoom.id
      }
    })

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


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{style}</style>
      </Head>
      <Flex bgColor="#8B89F7" display={['none', 'none', 'none', 'flex']} bgImage="/Img/bg_texture1.png" bgRepeat="no-repeat" bgSize="cover" w="full" h="100vh" justify="center" align="flex-end">
        <div className='profileP' style={{ paddingLeft: '1rem' }}>
          <div className='profileImg'></div>
          <Text className={dongle.className} fontSize='4xl'>{userRef.username}</Text>
          <Text className={dongle.className} fontSize='2xl'>status {userRef.status}</Text>
        </div>
        <div className='quick-match' onClick={matchingManager}>
          <div className={dongle.className}>Match</div>
        </div>
        <div  className='small-btn'>
          <div onClick={createRoom} className={dongle.className}>Create{"\n"}Room</div>
        </div>
        <Link href='/rank'><div className='small-btn rank'>
          <Picture src={"/Img/fire.png"} width="7em" top="6.25em" right="1.5em"></Picture>
          <div className={dongle.className}>Rank</div>
        </div></Link>
        <Link href='/leaderboard'><div className='leader-btn'>
          <Picture src={"/Img/hand1.png"} width="3.5em" top=".1em" left="2em"></Picture>
          <h1 className={dongle.className}>Leaderboard</h1>
        </div></Link>
        <Link href='/friends'><div className='friend-btn'>
          <Picture src={"/Img/hand3.png"} width="3.2em" top=".1em" right="6em"></Picture>
          <h1 className={dongle.className}>Friends</h1>
          <div style={{ position:'absolute',top: '-5px', right: '-5px', visibility: friendReqNum ? 'visible' : 'hidden', width: '25px', height:'25px', background:'#FF6839', borderRadius: '50%', display: 'flex', justifyContent: 'center' }}> { friendReqNum } </div>
        </div></Link>
        <Button maxW={'xs'} borderRadius={ '50' } position={'absolute'} top="2em" right="-2em" w="full" padding={'40px'} onClick={ ()=>{SignOut(router)} }> Sign Out </Button>
        {ChatApp(userRef, router, 'homePage')}
        <ChatLetter className={dongle.className} left=".75em" transform="rotate(-18.73deg)">C</ChatLetter>
        <ChatLetter className={dongle.className} left="1.25em" transform="rotate(-13.91deg)">h</ChatLetter>
        <ChatLetter className={dongle.className} left="1.75em" transform="rotate(7.27deg)">a</ChatLetter>
        <ChatLetter className={dongle.className} left="2.25em" transform="rotate(-8deg)">t</ChatLetter>
        <Picture src={"/Img/chat_mouth.png"} width="4.5em" top="36%" left="16em"></Picture>

        {
          inviteRef?.map((inv, index) => (
            <Modal key={index} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader background={'#ECD352'}>Invitation from {inv.inviter}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={() => acceptInv(inv.id, inv.rid)} colorScheme='blue' mr={3}>
                    Join
                  </Button>
                  <Button onClick={() => { rejectInv(inv.id) }}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          ))
        }
      </Flex>
      <Flex bgColor="#8B89F7" display={['flex', 'flex', 'flex', 'none']} bgImage="/Img/bg_texture1.png" bgRepeat="no-repeat" bgSize="cover" w="full" h="100vh" justify="center" align="center">
        <Avatar position='absolute' name={userRef.username} width='24' height='24' top='8' left='8' />
        <Link href='/leaderboard'>
          <div className='leader-btn'>
            <Picture src={"/Img/hand1.png"} width="3.5em" top=".1em" left="2em"></Picture>
            <h1 className={dongle.className}>Leaderboard</h1>
          </div>
        </Link>
        <Link href='/friends'>
          <div className='friend-btn'>
            <Picture src={"/Img/hand3.png"} width="3.2em" top=".1em" right="6em"></Picture>
            <h1 className={dongle.className}>Friends</h1>
          </div>
        </Link>
        <Flex direction='column' w={['80%', 'full']} maxW='md' gap='4'>
          <Button onClick={matchingManager} w='full' size='lg' bg='#FF6839' color='white'>Match</Button>
          <Link href="/rank"><Button w='full' bg='#EC8F4B' color='white'>Rank</Button></Link>
          <Button onClick={createRoom} w='full' bg='#ECC94B' color='white'>Create Room</Button>
          <Button w='full' bg='#85847B' color='white' onClick={ ()=>{SignOut(router)} }>Sign out</Button>
        </Flex>
      </Flex>
      { Matching(userRef, players) }

    </>
  )
}
