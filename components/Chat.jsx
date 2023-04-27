import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Box } from "./Container"

const ChatBuble = styled.div`
    width: fit-content;
    height: fit-content;
    padding: .25em;
    font-size: 14px;
    color: white;
    background-color: blueviolet;
    border-radius: .5em;
`

const ChatNameTag = styled.div`
    width: fit-content;
    height: fit-content;
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
    width: 25em;
    height: 20%;
    background-color: #5757575a;
    position: fixed;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    border-top-right-radius: .5em;
`

const ChatFrame = styled(Box)`
    display: flex;
    flex-direction: ${ props => props.direct || 'row'};
`
const Chat = ({url, displayName, msg, direct}) => (
    <ChatFrame direct={ direct }>
        <ChatProfile>
            <ChatProfileImg src={ url }></ChatProfileImg>
        </ChatProfile>
        <div>
            <ChatNameTag>{ displayName }</ChatNameTag>
            <ChatBuble>{ msg }</ChatBuble>
        </div>
    </ChatFrame>

)


export const ChatApp = ( userRef, router, roomId ) => {
    const { db } = require('../pages/api/firebaseSetup');
    const { addDoc, doc, collection, onSnapshot, orderBy, query, serverTimestamp } = require('firebase/firestore');

    const [ msg, setMsg ] = useState('');
    function handleSubmit(e) {
      e.preventDefault();
      console.log({imgUrl: userRef.imgUrl? userRef.imgUrl : '/profile.png',
      username: userRef.username,
      displayName: userRef.displayname ? userRef.displayname : `anonymous_${userRef.id}`,
      message: msg,
      createAt: serverTimestamp(),
      owner: userRef.id})
      addDoc(collection(doc(db, 'room', roomId), 'chat'), {
        imgUrl: userRef.imgUrl? userRef.imgUrl : '/profile.png',
        username: userRef.username,
        displayName: userRef.displayname ? userRef.displayname : `anonymous_${userRef.username}`,
        message: msg,
        createAt: serverTimestamp()
      })
      setMsg("");
    }

    const [ allMsg, setAllMsg ] = useState([])
    const fetchChatMessages = async () => {
      const q = query(collection(doc(db, 'room', roomId), 'chat'), orderBy('createAt'));
      onSnapshot(q, snapshot => {
        const docRef = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        setAllMsg(docRef)
      })
    }

    useEffect(()=>{
        if(router.isReady){
          fetchChatMessages();
      }
      }, [router.isReady])

      const dummy = useRef(null);
      useEffect(()=>{
        dummy.current?.scrollIntoView({behavior: 'smooth'});
      }, [allMsg])

    return (
    <>
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
    </>
    )
}
export { Chat, ChatContainer }