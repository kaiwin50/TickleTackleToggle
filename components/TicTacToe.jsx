import styled from "styled-components";
import { Container } from "./Container";
import { useEffect, useRef, useState } from "react";
import { Room } from "@/class/Room";
import { Button } from "./Button";
import { ChatContainer } from "./Chat";

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
const PlayerHand = styled.ul`
    width: 90%;
    height: fit-content;
    position: fixed;
    bottom: -10%;
    justify-content: center;
    display: flex;
    z-index: 1;
    & li{
        transition: .2s;
        translate: 0 0;
        margin: -10px;
        cursor: pointer;
    }
    & li:hover{
        translate: 0 -60px;
        z-index: 1;
    }
`



const { db } = require('@/pages/api/firebaseSetup');
const { doc, updateDoc, getDoc, collection, getDocs, deleteDoc } = require('firebase/firestore');

function TicTacToe(rid, player = { card: [] }, router) {
    const table = [
        { value: '', card: 'none', id: '0' }, { value: '', card: 'none', id: '1' }, { value: '', card: 'none', id: '2' },
        { value: '', card: 'none', id: '3' }, { value: '', card: 'none', id: '4' }, { value: '', card: 'none', id: '5' },
        { value: '', card: 'none', id: '6' }, { value: '', card: 'none', id: '7' }, { value: '', card: 'none', id: '8' }
    ]
    const room = new Room();
    const [boardRef, setBoardRef] = useState(table);
    const [activateCardIndex, setActivateCardIndex] = useState(-1);

    const activateCard = useRef();
    const [toggleSelect, setToggleSelect] = useState([])

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
        if (!result) {
            const isFull = UBRef[0].value != '' && UBRef[1].value != '' && UBRef[2].value != '' &&
                UBRef[3].value != '' && UBRef[4].value != '' && UBRef[5].value != '' && UBRef[6].value != '' &&
                UBRef[7].value != '' && UBRef[8].value != ''
            if (isFull) {
                updateDoc(doc(db, 'room', rid), {
                    winner: 'draw',
                    status: 'Game Over'
                })
                console.log('draw')
            }
        }
        console.log(result)
    }
    const write = async (id, card, value) => {
        if (roomRef.status == 'playing') {
            if (player.role == roomRef.turn) {
                console.log(player.activate.length)
                console.log((player.activate.length != 0 && value == (player.role == 'O' ? 'X' : 'O')))
                if (player.activate.length == 0 && value == '') {
                    const playerHand = await getDoc(doc(doc(db, 'room', rid), 'players', player.id))
                    updateDoc(doc(doc(db, 'room', rid), 'players', player.id), {
                        card: [...playerHand.data().card, card]
                    })
                    updateDoc(doc(doc(db, 'room', rid), 'board', id), {
                        value: player.role,
                        card: 'none'
                    })

                    check()
                    updateDoc(doc(db, 'room', rid), {
                        turn: player.role == 'O' ? 'X' : 'O'
                    })
                }
                else if (player.activate.length != 0) {
                    console.log(player.activate)
                    let playerHand = player.card;
                    switch (player.activate[0]) {
                        case 'Tickle':
                            if (value == (player.role == 'O' ? 'X' : 'O')) {
                                updateDoc(doc(doc(db, 'room', rid), 'board', id), {
                                    value: player.role,
                                })
                                playerHand.splice(activateCardIndex, 1);
                                updateDoc(doc(doc(db, 'room', rid), 'players', player.id), {
                                    card: playerHand,
                                    activate: []
                                })
                                check()
                                updateDoc(doc(db, 'room', rid), {
                                    turn: player.role == 'O' ? 'X' : 'O'
                                })
                            }

                            break;
                        case 'Tackle':
                            if (value == (player.role == 'O' ? 'X' : 'O')) {
                                updateDoc(doc(doc(db, 'room', rid), 'board', id), {
                                    value: '',
                                })
                                playerHand.splice(activateCardIndex, 1);
                                updateDoc(doc(doc(db, 'room', rid), 'players', player.id), {
                                    card: playerHand,
                                    activate: []
                                })
                                check()
                                updateDoc(doc(db, 'room', rid), {
                                    turn: player.role == 'O' ? 'X' : 'O'
                                })
                            }

                            break;
                        case 'Toggle':
                            if(value == (player.role != 'O' ? 'X' : 'O') && toggleSelect.length == 0){
                                setToggleSelect([{'id' : id, 'value': value}]);
                            }
                            else if(value == (player.role == 'O' ? 'X' : 'O') && toggleSelect.length == 1){
                                setToggleSelect((old) => [...old, {'id' : id, 'value': value}]);
                                console.log(toggleSelect)
                                updateDoc(doc(doc(db, 'room', rid), 'board', toggleSelect[0].id), {
                                    value: value
                                })
                                updateDoc(doc(doc(db, 'room', rid), 'board', id), {
                                    value: toggleSelect[0].value
                                })
                                playerHand.splice(activateCardIndex, 1);
                                updateDoc(doc(doc(db, 'room', rid), 'players', player.id), {
                                    card: playerHand,
                                    activate: []
                                })
                                check()
                                updateDoc(doc(db, 'room', rid), {
                                    turn: player.role == 'O' ? 'X' : 'O'
                                })
                                setToggleSelect([])
                            }

                    }
                }

            }
        }
    }

    const endPlay = async () => {
        room.destroy(rid, players);
        router.replace('../home')
    }
    const deactivate = () => {
        updateDoc(doc(doc(db, 'room', rid), 'players', player.id), {
            activate: []
        })
    }
    const useCard = (card, index) => {
        updateDoc(doc(doc(db, 'room', rid), 'players', player.id), {
            activate: [card]
        })
        setActivateCardIndex(index)
    }

    const [roomRef, setRoomRef] = useState([]);
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            room.subscribe(rid, setRoomRef, setPlayers, setBoardRef)
        }
    }, [router.isReady])
    return (<>
        <Container width="35em">turn : {roomRef?.turn}</Container>
        <Container width="35em">Your Role : {player?.role}</Container>
        <Container width="35em" visible={roomRef ? (roomRef.winner == '' ? 'hidden' : 'visible') : 'hidden'}>
            winner:  {roomRef?.winner}
        </Container>

        <Container width="35em" color="wheat">
            {
                boardRef?.map(({ value, card, id }) => (
                    <GameBox key={id} onClick={() => { write(id, card, value) }}>
                        <p>{value}</p>
                        <embed style={{ borderRadius: '10px', display: card == 'none' ? 'none' : 'unset', pointerEvents: 'none' }} src={`/Img/${card}.svg`} width="115.5px" height="162px"></embed>
                    </GameBox>
                )
                )}
        </Container>
        <PlayerHand>
            {(player.card)?.map((cardName, index) => (
                <li key={index} onClick={() => { useCard(cardName, index) }} >
                    <embed style={{ borderRadius: '10px', pointerEvents: 'none' }} src={`/Img/${cardName}.svg`} width="115.5px" height="162px"></embed>
                </li>
            ))}
        </PlayerHand>
        <Button onClick={endPlay}>end</Button>
        <ChatContainer ref={activateCard} style={{ top: '5%', height: 'fit-content', width: 'fit-content', padding: '1em' }}>
            {(player.activate)?.map((cardName, index) => (
                <li key={index} onClick={deactivate} >
                    <embed style={{ borderRadius: '10px', pointerEvents: 'none' }} src={`/Img/${cardName}.svg`} width="115.5px" height="162px"></embed>
                </li>
            ))}
        </ChatContainer>
    </>
    );
}

export default TicTacToe;