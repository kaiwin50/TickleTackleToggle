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
    width: 35em;
    height: 30%;
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

export { Chat, ChatContainer }