import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container } from '@/components/Container'
import { Button, CloseBtn } from '@/components/Button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import auth, { c_user } from '../api/auth'
import { dongle, heyComic } from '@/components/Font'
import texture5 from '../../public/Img/bg_texture5.png'
import { PictureFlex } from '@/components/Image'
import { ChatApp, ChatLetter } from '@/components/Chat'
import { useRouter } from 'next/router'
import { Room } from '@/class/Room'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/config/firebaseSetup'

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
    h2{
        width: 100%;
        justify-content: center;
        display: flex;
        font-size: 3em;
        text-shadow: .75px .75px 0 #000,
        -.75px .75px 0 #000,
        .75px -.75px 0 #000,
        -.75px -.75px 0 #000,
        0px .75px 0 #000,
        0px -.75px 0 #000,
        -.75px 0px 0 #000,
        .75px 0px 0 #000,
        1.25px 1.25px 0 #000,
        -1.25px 1.25px 0 #000,
        1.25px -1.25px 0 #000,
        -1.25px -1.25px 0 #000,
        0px 1.25px 0 #000,
        0px -1.25px 0 #000,
        -1.25px 0px 0 #000,
        1.25px 0px 0 #000,
        .75px 1.25px 0 #000,
        -.75px 1.25px 0 #000,
        .75px -1.25px 0 #000,
        -.75px -1.25px 0 #000,
        1.25px .75px 0 #000,
        -1.25px .75px 0 #000,
        1.25px -.75px 0 #000,
        -1.25px -.75px 0 #000;
    }
    .row h3 {
        font-size: 2em;
        color: black;
    }
    .searchBar h3 {
        width: 35%;
    }
    .searchBar input {
        width: 65%;
        border-radius: 1em;
        background-color: white;
        padding: .25em;
        outline: none;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        box-sizing: border-box;
        position: relative;
        color: black;
        font-size:1.2em;
    }
    .name_room {
        width:100%;
        display:flex;
        justify-content:center;
        color:#FF6839;
        font-size: 3em;
        margin-top:1em;
        width: 100%;
        justify-content: center;
        display: flex;
        font-size: 3em;
        text-shadow: .75px .75px 0 #000,
        -.75px .75px 0 #000,
        .75px -.75px 0 #000,
        -.75px -.75px 0 #000,
        0px .75px 0 #000,
        0px -.75px 0 #000,
        -.75px 0px 0 #000,
        .75px 0px 0 #000,
        1.25px 1.25px 0 #000,
        -1.25px 1.25px 0 #000,
        1.25px -1.25px 0 #000,
        -1.25px -1.25px 0 #000,
        0px 1.25px 0 #000,
        0px -1.25px 0 #000,
        -1.25px 0px 0 #000,
        1.25px 0px 0 #000,
        .75px 1.25px 0 #000,
        -.75px 1.25px 0 #000,
        .75px -1.25px 0 #000,
        -.75px -1.25px 0 #000,
        1.25px .75px 0 #000,
        -1.25px .75px 0 #000,
        1.25px -.75px 0 #000,
        -1.25px -.75px 0 #000;
    }
    .iYmDAq {
        top:0;
      }
      h1{
        color:black;
      }
`
export default function CreateRoom() {
    const router = useRouter();
    const { rid } = router.query;
    const [roomRef, setRoomRef] = useState({})
    const [players, setPlayers] = useState([])
    const [userRef, setUserRef] = useState([])
    const [friends, setFriends] = useState([])
    const room = new Room()

    const invite = (id) => {
        setDoc(doc(doc(db, 'users', id), 'invite', userRef.id), {
            rid: rid,
            inviter: userRef.username
        })
    }
    const ready = () => {
        updateDoc(doc(doc(db, 'room', rid), 'players', userRef.id), {
            isReady: true
          })
    }
    useEffect(() => {
        if (router.query.rid) {
            room.subscribe(router.query.rid, setRoomRef, setPlayers);
        }
    }, [router.query.rid])
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log('user: ', user)
                console.log('wadw', router.query.rid)
                onSnapshot(doc(db, 'users', user.uid), userInfo => {
                    setUserRef({ ...userInfo.data(), id: userInfo.id })
                    const data = userInfo.data();
                    console.log(data)
                    if (data.status == 'idle') {
                        router.push('home');
                    }
                    else if (data.status == 'playing') {
                        router.push(`/play/${data.inRoom}`);
                    }
                })
                onSnapshot(collection(doc(db, 'users', user.uid), 'friend'), friendsDocs => {
                    setFriends(friendsDocs.docs.map(fr => ({ ...fr.data(), id: fr.id })))
                });
            }
            else {
                console.log(null);
            }
        })
    }, [router.isReady])
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <style>{style}</style>
            </Head>
            <main className={styles.main} style={{
                backgroundImage: `url(${texture5.src})`,
                height: '100vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                <Container width="110%" bdradius="0%" color="transparent" padding="0" className={dongle.className}>
                    <Link href='/home'><CloseBtn className={dongle.className}>x</CloseBtn></Link>
                    <Container width="65%" bdradius="0%" color="transparent">
                        <Container width="100%" bdradius="0%" color="transparent">
                            <Container width="40%" color="transparent">
                                <Container width="65%" height="100%" bdradius="50px" color="white" border=" 3px solid #000000" shadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
                                    <PictureFlex src={"/Img/monster3.png"} width="8em"></PictureFlex>
                                    <h3 className='name_room'>
                                        {players.map((player, index) => {
                                            if (player.id == roomRef.owner) {
                                                return (
                                                    <span key={index}>{player.data().username}</span>
                                                )
                                            }

                                        })}
                                    </h3>

                                </Container>
                            </Container>
                            <Container width="20%" bdradius="50px" color="transparent">
                                <PictureFlex src={"/Img/vs.png"} width="10em" transform="rotate(12.1deg)"></PictureFlex>
                            </Container>
                            <Container width="40%" color="transparent">
                                <Container width="65%" height="100%" bdradius="50px" color="white" border=" 3px solid #000000" shadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
                                    <PictureFlex src={"/Img/monster4.png"} width="11em"></PictureFlex>
                                    <h3 className='name_room'>
                                    {players.map((player, index) => {
                                            if (player.id != roomRef.owner) {
                                                return (
                                                    <span key={index}>{player.data().username}</span>
                                                )
                                            }

                                        })}
                                    </h3>
                                </Container>
                            </Container>
                        </Container>
                        <Container width="100%" bdradius="0%" color="transparent" >
                            <Button onClick={ready} padding="2em" className={dongle.className} color="#ECC94B" fontsize="2em" border="1px solid #000000">Ready</Button>
                        </Container>
                    </Container>
                    <Container width="25vw" padding="0" height="90vh" bdradius="10px" color="white" shadow="6px 6px 1px 4px rgba(0, 0, 0, 0.5)" mgtop="-4em">
                        <PictureFlex src={"/Img/online.png"} width="90%" mtop="0"></PictureFlex>
                        <Container width="90%" height="70vh" bdradius="10px" color="#ECD352" border="3px solid #000000" shadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)">
                            <Container alignItems='unset' width="100%" overflowy='auto' height="100%" bdradius="15px" color="rgba(255, 253, 253, 0.6)" border="2px solid #000000" shadow="px 6px 4px rgba(0, 0, 0, 0.25)">
                                {
                                    friends?.map((fr, index) => (
                                        <Container key={index} width="100%" className="row" bdradius="10px" mgtop='1em' color="rgba(255, 252, 252, 0.6)">
                                            <Container color="transparent" fontsize='.75em' width="40%" bdradius="0" padding="0">
                                                <h3>{fr.username}</h3>
                                            </Container>
                                            <Container color="transparent" width="10%" bdradius="0">
                                                <Container width="2em" color="#13EC9E" border="1px solid #000000" bdradius="50%" padding=".5em"></Container>
                                            </Container>
                                            <Container color="transparent" width="30%" bdradius="0">
                                                <Button onClick={() => { invite(fr.id) }} className={dongle.className} bdradius="10px" color="#13EC9E" border="1px solid #000000" hovercolor="rgba(19, 236, 158, 0.54)" fontsize="1em">Invite</Button>
                                            </Container>
                                        </Container>
                                    ))
                                }
                            </Container>
                        </Container>
                    </Container>
                </Container>
                { ChatApp(userRef, router, rid) }



            </main>
        </>
    )
}
