import styled from "styled-components";
import { Container, ContainerAbsolute } from "./Container";
import { useEffect, useState } from "react";
import { Room } from "@/class/Room";
import { Button } from "./Button";
import { css } from 'styled-components'
import { dongle, heyComic } from '@/components/Font'
import { Picture, PictureFlex } from '@/components/Image'
const style = css`
    .turnLabel {
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
        background: rgba(74, 38, 134, 0.7);
        border: 3px solid #2724B2;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    }
    .turnLabel h1{
        color: #FF6839;
        font-size: 3em;
    }
    .profile-match h3{
        width:100%;
        justify-content: center;
        display: flex;
        font-size:2em;
        color: black;
    }
    .profile-match h2{
        width:100%;
        justify-content: center;
        display: flex;
    }
    .profile-match2 h2{
        width:100%;
        justify-content: center;
        display: flex;
        margin-top:-5em;
    }
    .win_page h1 {
        z-index:5;
        color:black;
        width:100%;
        display:flex;
        justify-content:center;
        margin-top:-18%;
        font-size: 4em;
    }
`
const gameBox = ({ className, children, props, onClick }) => (
    <div className={className} onClick={onClick} {...props}>
        {children}
    </div>
);

export const GameBox = styled(gameBox)`
    width: 4.75em;
    height: 4.75em;
    background-color: ${props => props.color || "white"};
    border : 2px solid #2724B2;
    display: inline-flex;
    cursor: pointer;
    position: relative;
    justify-content: center;
    align-items: center;
    color: black;
    padding:0;
    font-size: 2em;
    &:hover{
        background-color: wheat;
    }
    & p{
        position: absolute;
        width: 80%;
        text-align: center;
    }
`

const { db } = require('@/config/firebaseSetup');
const { doc, updateDoc, getDoc, collection, getDocs, deleteDoc } = require('firebase/firestore');

function TicTacToe(rid, player, router) {
    const table = [
        { value: '', card: '', id: '0' }, { value: '', card: '', id: '1' }, { value: '', card: '', id: '2' },
        { value: '', card: '', id: '3' }, { value: '', card: '', id: '4' }, { value: '', card: '', id: '5' },
        { value: '', card: '', id: '6' }, { value: '', card: '', id: '7' }, { value: '', card: '', id: '8' }
    ]
    const room = new Room();
    const [boardRef, setBoardRef] = useState(table);

    const check = async () => {
        const updatedBoard = await getDocs(collection(doc(db, 'room', rid), 'board'));
        const UBRef = updatedBoard.docs.map(doc => ({ id: doc.id, value: doc.data().value }))
        console.log(UBRef)
        var result;
        const checkList = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        checkList.forEach(lines => {
            const isOver = UBRef[lines[0]].value == UBRef[lines[1]].value && UBRef[lines[0]].value == UBRef[lines[2]].value && UBRef[lines[0]].value != ''
            if (isOver) {
                result = isOver;
                updateDoc(doc(db, 'room', rid), {
                    status: 'Game Over',
                    winner: UBRef[lines[0]].value
                    
                })
            }
        })
        if(!result){
            const isFull = UBRef[0].value != '' && UBRef[1].value != '' && UBRef[2].value != '' &&
             UBRef[3].value != '' && UBRef[4].value != '' && UBRef[5].value != '' && UBRef[6].value != '' && 
             UBRef[7].value != '' && UBRef[8].value != ''
            if(isFull){
                updateDoc(doc(db, 'room', rid), {
                    winner: 'draw',
                    status: 'Game Over'
                })
                console.log('draw')
            }
        }
        console.log(result)
    }
    const write = async (id) => {
        if (roomRef.status == 'playing') {
            if (player.role == roomRef.turn) {
                updateDoc(doc(doc(db, 'room', rid), 'board', id), {
                    value: player.role
                })
                check()
                updateDoc(doc(db, 'room', rid), {
                    turn: player.role == 'O' ? 'X' : 'O'
                })
            }
        }
    }

    const endPlay = async ()=>{
        room.destroy(rid, players);
        router.push('../home')
      }

    const [roomRef, setRoomRef] = useState([]);
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            room.subscribe(rid, setRoomRef, setPlayers, setBoardRef)
        }
    }, [router.isReady])
    return (<>
        <style>{style}</style>
        <ContainerAbsolute className="turnLabel" width="25%" height="17.5%" top="0" left="37.5%">
            <h1 className={heyComic.className}>Turn : { roomRef?.turn }</h1>
        </ContainerAbsolute>
        <ContainerAbsolute className="profile-match" width="30%" height="60%" bottom="0" left="2.5%" padding="0" color="transparent">
            <h2 className={heyComic.className}>Activate Class</h2>
            <Container width="40%" height="60%" padding="0" color="#FFFFFF" border="3px solid #000000" shadow="8px 4px 3px rgba(0, 0, 0, 0.25)" bdradius="20px" mgtop="-3em">

            </Container>
            <h3 className={dongle.className}>Your Role : { player?.role }</h3>
        </ContainerAbsolute>

        <ContainerAbsolute className="profile-match2" width="30%" height="60%" top="0" right="2.5%" padding="0" color="transparent">
            <Container width="40%" height="60%" padding="0" color="#FFFFFF" border="3px solid #000000" shadow="8px 4px 3px rgba(0, 0, 0, 0.25)" bdradius="20px">
            </Container>
            <h2 className={heyComic.className}>Activate Class</h2>
        </ContainerAbsolute>
        

        <Container width="35%" color="transparent" mgtop="5%" padding="0">
            {
                boardRef?.map(({ value, card, id }) => (
                    <GameBox className={dongle.className} key={id} onClick={() => { write(id) }}><p>{value}</p></GameBox>
                )
                )}
        </Container>
        <Container width="100%" color="transparent" justify="end">
        <Button color="#E53E3E" className={dongle.className} fontsize="1.5em" bdradius="10px" hovercolor="#de3500" fontcolor="white" onClick={ endPlay }>Surrender</Button>
        </Container>
        <ContainerAbsolute className="win_page" width="100%" height="100%" top="0" left="0" visible={ roomRef ? (roomRef.winner == '' ? 'hidden' : 'visible'): 'hidden'} zindex="4" >
           <Picture visible={ roomRef ? (roomRef.winner == '' ? 'hidden' : 'visible'): 'hidden'}  src={"/Img/bg_texture4.png"} width="100%" height="100%" top="0" left="0"></Picture>
           <Container width="100%" color="transparent" visible={ roomRef ? (roomRef.winner == '' ? 'hidden' : 'visible'): 'hidden'}>
            <PictureFlex visible={ roomRef ? (roomRef.winner == '' ? 'hidden' : 'visible'): 'hidden'} src={"/Img/win.png"} width="40%"></PictureFlex>
           </Container>
           <h1 className={heyComic.className}>{ roomRef?.winner }</h1>
           <Button color="#805AD5" className={dongle.className} fontsize="2em" bdradius="6px" hovercolor="#543b8c" fontcolor="white" onClick={ endPlay }>Home</Button>
            
        </ContainerAbsolute>

    </>
    );
}

export default TicTacToe;