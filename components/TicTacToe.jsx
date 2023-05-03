import styled from "styled-components";
import { Container, ContainerAbsolute } from "./Container";
import { useEffect, useRef, useState } from "react";

import { Room } from "@/class/Room";
import { Button } from "./Button";
import { ChatContainer } from "./Chat";
import { css } from 'styled-components'
import { dongle, heyComic } from '@/components/Font'
import { Picture, PictureFlex } from '@/components/Image'
import { db } from "@/config/firebaseSetup";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
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
    width: 1em;
    height: 1em;
    background-color: ${props => props.color || "white"};
    border : 2px solid #2724B2;
    display: inline-flex;
    cursor: pointer;
    position: relative;
    justify-content: center;
    align-items: center;
    color: ${props => props.fontColor};
    padding:0;
    font-size: 2em;
    border-top-left-radius: ${props => props.borderTopLeft};
    border-top-right-radius: ${props => props.borderTopRight};
    border-bottom-left-radius: ${props => props.borderBottomLeft};
    border-bottom-right-radius: ${props => props.borderBottomRight};
    font-size: 9em;
    &:hover{
        background-color: wheat;
    }
    & p{
        position: absolute;
        width: 80%;
        text-align: center;
    }
`
const PlayerHand = styled.ul`
    width: 60%;
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
    const [opponent, setOpponent] = useState({})

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
                    if (card != 'none') {
                        updateDoc(doc(doc(db, 'room', rid), 'players', player.id), {
                            card: [...playerHand.data().card, card]
                        })
                    }
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
                            if (value == (player.role != 'O' ? 'X' : 'O') && toggleSelect.length == 0) {
                                setToggleSelect([{ 'id': id, 'value': value }]);
                            }
                            else if (value == (player.role == 'O' ? 'X' : 'O') && toggleSelect.length == 1) {
                                setToggleSelect((old) => [...old, { 'id': id, 'value': value }]);
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
                            break;

                    }
                }

            }
        }
    }

    const surrender = async () => {
        room.surrender(rid, player);
        router.replace('/home')
    }
    const endPlay = async () => {
        room.destroy(rid, player);
        router.replace('/home')
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
        <style>{style}</style>
        <ContainerAbsolute className="turnLabel" width="25%" height="17.5%" top="0" left="37.5%">
            <h1 className={heyComic.className}>Turn : {roomRef?.turn}</h1>
        </ContainerAbsolute>
        <ContainerAbsolute className="profile-match" width="30%" height="60%" bottom="0" left="2.5%" padding="0" color="transparent">
            <h2 className={heyComic.className}>Activate Card</h2>
            <Container width="40%" height="60%" padding="0" color="#FFFFFF" border="3px solid #000000" shadow="8px 4px 3px rgba(0, 0, 0, 0.25)" bdradius="20px" mgtop="-3em">
                {(player.activate)?.map((cardName, index) => (
                    <li key={index} onClick={deactivate} >
                        <embed style={{ borderRadius: '10px', pointerEvents: 'none' }} src={`/Img/${cardName}.svg`} width="115.5px" height="162px"></embed>
                    </li>
                ))}
            </Container>
            <h3 className={dongle.className}>Your Role : {player?.role}</h3>
        </ContainerAbsolute>

        <ContainerAbsolute className="profile-match2" width="30%" height="60%" top="0" right="2.5%" padding="0" color="transparent">
            <Container width="40%" height="60%" padding="0" color="#FFFFFF" border="3px solid #000000" shadow="8px 4px 3px rgba(0, 0, 0, 0.25)" bdradius="20px">
                {(players)?.map((opponent, index) => {
                    if (opponent.id != player.id && opponent.data().activate[0] != undefined) {
                        return (
                            <li key={index} onClick={deactivate} >
                                <embed style={{ borderRadius: '10px', pointerEvents: 'none' }} src={`/Img/${(opponent.data().activate)[0]}.svg`} width="115.5px" height="162px"></embed>
                            </li>
                        )
                    }

                })}

            </Container>
            <h2 className={heyComic.className}>Activate Card</h2>
        </ContainerAbsolute>


        <Container width="40%" color="transparent" mgtop="5%" padding="0">
            {
                boardRef?.map(({ value, card, id }) => (
                    <GameBox className={dongle.className} key={id} onClick={() => { write(id, card, value) }}
                        borderTopLeft={id == 't0' ? '25px' : '0'}
                        borderTopRight={id == 't2' ? '25px' : '0'}
                        borderBottomLeft={id == 't6' ? '25px' : '0'}
                        borderBottomRight={id == 't8' ? '25px' : '0'}
                        fontColor={value == 'O' ? '#13ec9e' : '#8B89F7'}>
                        <p>{value}</p>
                        <embed style={{ borderRadius: '10px', display: card == 'none' ? 'none' : 'unset', pointerEvents: 'none' }} src={`/Img/${card}.svg`} width="77px" height="108px"></embed>
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
        <Container width="100%" color="transparent" justify="end">
            <Button color="#E53E3E" className={dongle.className} style={{ bottom: '200px', position: 'absolute' }} fontsize="1.5em" bdradius="10px" hovercolor="#de3500" fontcolor="white" onClick={surrender}>Surrender</Button>
        </Container>
        <ContainerAbsolute className="win_page" width="100%" height="100%" top="0" left="0" visible={roomRef ? (roomRef.status == 'Game Over' ? 'visible' : 'hidden') : 'hidden'} zindex="4" >
            <Picture visible={roomRef ? (roomRef.winner == '' ? 'hidden' : 'visible') : 'hidden'} src={`/Img/${roomRef.winner == player.role ? 'bg_win' : 'bg_lose'}.png`} width="100%" height="100%" top="0" left="0"></Picture>
            <Container width="100%" color="transparent" visible={roomRef ? (roomRef.winner == '' ? 'hidden' : 'visible') : 'hidden'}>
                <div style={{ paddingTop: '10vh', width: '37.5vw', height: '37.5vw', background: '#ffffffa6', borderRadius: '50%', boxShadow: '0px 12px 5px #000000a1', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    <PictureFlex visible={roomRef ? (roomRef.winner == '' ? 'hidden' : 'visible') : 'hidden'} src={`/Img/${roomRef.winner == player.role ? 'win' : 'lose'}.png`} width="40%"></PictureFlex>
                    <h1 className={heyComic.className} style={{ paddingTop: '17vh'}}>{roomRef.winner == player.role ? 'Victory !' : 'Defeat'}</h1>
                    <h1 className={heyComic.className} style={{ paddingTop: '17vh'}}>{player?.role}</h1>
                </div>
            </Container>
            <Button color="#805AD5" className={dongle.className} fontsize="2em" bdradius="6px" hovercolor="#543b8c" fontcolor="white" onClick={endPlay}>Home</Button>
        </ContainerAbsolute>
    </>
    );
}

export default TicTacToe;