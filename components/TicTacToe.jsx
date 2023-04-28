import styled from "styled-components";
import { Container } from "./Container";
import { useEffect, useState } from "react";
import { Room } from "@/class/Room";
import { Button } from "./Button";

const gameBox = ({ className, children, props, onClick }) => (
    <div className={className} onClick={onClick} {...props}>
        {children}
    </div>
);

export const GameBox = styled(gameBox)`
    width: 10em;
    height: 10em;
    background-color: ${props => props.color || "#3e2b85"};
    display: inline-flex;
    margin: .25em;
    border-radius: 1em;
    cursor: pointer;
    position: relative;
    justify-content: center;
    align-items: center;
    &:hover{
        background-color: #51467f;
    }
    & p{
        position: absolute;
        width: 80%;
        text-align: center;
    }
`

const { db } = require('@/pages/api/firebaseSetup');
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
        <Container width="35em">turn : { roomRef?.turn }</Container>
        <Container width="35em">Your Role : { player?.role }</Container>
        <Container width="35em" visible={ roomRef ? (roomRef.winner == '' ? 'hidden' : 'visible'): 'hidden'}>
           winner:  { roomRef?.winner }
        </Container>

        <Container width="35em" color="wheat">
            {
                boardRef?.map(({ value, card, id }) => (
                    <GameBox key={id} onClick={() => { write(id) }}><p>{value}</p></GameBox>
                )
                )}
        </Container>
        <Button onClick={ endPlay }>end</Button>

    </>
    );
}

export default TicTacToe;