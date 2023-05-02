import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Box } from "./Container"
import { dongle } from '@/components/Font'
const ChatBuble = styled.div`
    width: fit-content;
    height: fit-content;
    padding: .25em;
    font-size: 1.1em;
    color: black;
    background-color: white;
    border-radius: .5em;
    border: 2px solid #000000;
`

const ChatNameTag = styled.div`
    width: fit-content;
    height: fit-content;
    color:black;
    font-size:1.2em;
`

const ChatProfile = styled.div`
    width: 2em;
    height: 2em;
    border-radius: 50%;
    position: relative;
`
const ChatProfileImg = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
`
const ChatContainer = styled.div`
    width: 22.5em;
    height: 40%;
    position: fixed;
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid #000000;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.25);
    bottom: 21%;
    left: 0;
    /* overflow-y: auto; */
    border-top-right-radius: .5em;
    border-bottom-right-radius: .5em;
`
const ChatLetter = styled.div`
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 30%;
    left: ${props => props.left};
    overflow-y: auto;
    font-size:6em;
    color:#ECC94B;
    transform:${props => props.transform};
    text-shadow: 1px 1px 0 #000,
        -1px 1px 0 #000,
        1px -1px 0 #000,
        -1px -1px 0 #000,
        0px 1px 0 #000,
        0px -1px 0 #000,
        -1px 0px 0 #000,
        1px 0px 0 #000,
        2px 2px 0 #000,
        -2px 2px 0 #000,
        2px -2px 0 #000,
        -2px -2px 0 #000,
        0px 2px 0 #000,
        0px -2px 0 #000,
        -2px 0px 0 #000,
        2px 0px 0 #000,
        1px 2px 0 #000,
        -1px 2px 0 #000,
        1px -2px 0 #000,
        -1px -2px 0 #000,
        2px 1px 0 #000,
        -2px 1px 0 #000,
        2px -1px 0 #000,
        -2px -1px 0 #000;
`

const ChatFrame = styled(Box)`
    display: flex;
    flex-direction: ${props => props.direct || 'row'};
    margin:1em;
`
const Chat = ({ url, displayName, msg, direct }) => (
  <ChatFrame direct={direct}>
    <ChatProfile>
      <ChatProfileImg src={url}></ChatProfileImg>
    </ChatProfile>
    <div>
      <ChatNameTag className={dongle.className}>{displayName}</ChatNameTag>
      <ChatBuble className={dongle.className}>{msg}</ChatBuble>
    </div>
  </ChatFrame>

)

const ChatInput = styled.input`
    width : 90%;
    background-color:white;
    border: 2px solid #000000;
    left: 5%;
    color:black;
    padding: .25em;
    border-radius: .5em;
    font-size:1.1em;
    bottom: 0;
    &::placeholder{
      font-size:1.1em;
    }
`
const ChatInputContainer = styled.form`
  width: 100%;
  position: absolute;
  bottom: 0;
`

export const ChatApp = (userRef, router, roomId) => {
  const { db } = require('../config/firebaseSetup');
  const { addDoc, doc, collection, onSnapshot, orderBy, query, serverTimestamp } = require('firebase/firestore');

  const [msg, setMsg] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    console.log({
      imgUrl: userRef.imgUrl ? userRef.imgUrl : '/profile.png',
      username: userRef.username,
      displayName: userRef.displayname ? userRef.displayname : `anonymous_${userRef.id}`,
      message: msg,
      createAt: serverTimestamp(),
      owner: userRef.id
    })
    addDoc(collection(doc(db, 'room', roomId), 'chat'), {
      imgUrl: userRef.imgUrl ? userRef.imgUrl : '/profile.png',
      username: userRef.username,
      displayName: userRef.displayname ? userRef.displayname : `anonymous_${userRef.username}`,
      message: msg,
      createAt: serverTimestamp()
    })
    setMsg("");
  }

  const [allMsg, setAllMsg] = useState([])
  const fetchChatMessages = async () => {
    const q = query(collection(doc(db, 'room', roomId), 'chat'), orderBy('createAt'));
    onSnapshot(q, snapshot => {
      const docRef = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setAllMsg(docRef)
    })
  }

  useEffect(() => {
    if (router.isReady) {
      fetchChatMessages();
    }
  }, [router.isReady])

  const dummy = useRef(null);
  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMsg])

  return (
    <>
    <ChatContainer>
      <div style={{position: 'absolute', height: '90%', top: '0', overflowY: 'auto', width: '100%'}}>
        {allMsg?.map((chat, index) => {
          return (
            <Chat key={index} msg={chat.message} displayName={userRef.username == chat.username ? 'Me' : chat.displayName} direct={userRef.username == chat.username ? 'row-reverse' : 'row'} url={chat.imgUrl ? chat.imgUrl : '/profile.png'}></Chat>
          )
        })}
        <div ref={dummy}></div>
      </div>
        <ChatInputContainer onSubmit={handleSubmit}>
          <ChatInput className={[dongle.className, "chat_input"].join(" ")} name='msg' type="text" placeholder="Text Something..." value={msg} onChange={(e) => { setMsg(e.target.value) }} />
        </ChatInputContainer>
    </ChatContainer>
      
    </>
  )
}
export { Chat, ChatContainer, ChatLetter }