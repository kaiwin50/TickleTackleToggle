import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { dongle, heyComic } from '@/components/Font'
import { Flex, Text, Img, Button, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { addDoc, collection, doc, getCountFromServer, getDocs, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '@/config/firebaseSetup'
import { Room } from '@/class/Room'

const roomInit = {
  status: 'waiting for matching.', player1: { username: 'none', uid: '' }, player2: { username: 'none', uid: '' }
}

export default function Rank() {
  const router = useRouter();

  const [roomRef, setRoomRef] = useState(roomInit)
  const [players, setPlayers] = useState(roomInit)

  const [userRef, setUserRef] = useState({})
  const room = new Room();

  const start = async () => {
    console.log(userRef.rank.title)
    const q = query(collection(db, 'rank'), where('title', '==', userRef.rank.title), where('isFull', '==', false), where('status', '==', 'wait another players'))
    const qCount = await getCountFromServer(q);
    console.log(qCount.data().count)
    if(qCount.data().count > 0) { 
      const qDocs = await getDocs(q);
      console.log(qDocs.docs[0].id)
      room.addPlayer(doc(db, 'rank', qDocs.docs[0].id), userRef, 'waiting rank');
      room.subscribeRank(qDocs.docs[0].id, setRoomRef, setPlayers)
    }
    else{
      const newRoom = await addDoc(collection(db, 'rank'), {
        title: userRef.rank.title,
        isFull: 'false',
        status: 'wait another players',
        createTime: serverTimestamp()
      })
      room.addPlayer(doc(db, 'rank', newRoom.id), userRef, 'waiting rank');
      room.subscribeRank(newRoom.id, setRoomRef, setPlayers)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user: ', user)
        onSnapshot(doc(db, 'users', user.uid), userInfo => {
          setUserRef({ ...userInfo.data(), id: userInfo.id })
          console.log(userInfo)
          if(userInfo.data().status == 'ranking' && userInfo.data().inRoom != undefined){
            router.push(`/rank/play/${userInfo.data().inRoom}`)
          }
        })
      }
    })
  }, [])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex bgColor="#FF6839" bgImage="/Img/bg_texture2.png" bgRepeat="repeat-x" bgSize="contain" w="full" h="100vh" justify="center" align="center">
        <Flex h="full" w="full" align="center" justify="center">
          <Img src='/Img/rank.png' position="absolute" />
          <Img src='/Img/hand0.png' position="absolute" maxW="xs" />
        </Flex>
        <Flex direction="column" h="60%" w="full" align="center" justify="center">
          <Flex h="full" gap="16" align="center">
            <Box bg="#F0F341" w="100px" h="100px" rounded="full" boxShadow='2xl' />
            <Box bg="#F0F341" w="100px" h="100px" rounded="full" boxShadow='2xl' />
            <Box bg="#F0F341" w="100px" h="100px" rounded="full" boxShadow='2xl' />
          </Flex>
          <Flex h="full" align="center">
            <Flex justify="center" align="center" bg='yellow.400' borderRadius="10px" shadow="md" height="20" width="2xs" _hover={{ cursor: 'pointer', background: 'yellow.300' }}>
              <Text fontSize="6xl" className={dongle.className} onClick={ start }>Start</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Button colorScheme='yellow' position="absolute" size="lg" top="4" left="4" onClick={() => router.push('/home')}>Back</Button>
    </>
  )
}
