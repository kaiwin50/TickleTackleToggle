import { db } from "@/config/firebaseSetup";
import { Button as BTN4 } from "./Button";
import { Container, ContainerFluid } from "./Container";
import { dongle } from "./Font";
import { Background, Picture, PictureFlex } from "./Image";
import { Room } from "@/class/Room";
import {Card } from '@chakra-ui/react'
import { doc, updateDoc } from "firebase/firestore";

export default (userRef, players, type = 'room') => {
    const room = new Room();
    const userReady = () => {
        updateDoc(doc(doc(db, type, userRef.inRoom), 'players', userRef.id), {
            isReady: true
        })
    }
    const destroyRoom = () => {
        room.destroy(userRef.inRoom, userRef, type)
    }

    return (
        <ContainerFluid className="matching" width="100vw" height="100vh" visible={(userRef.status == 'matching' || userRef.status == 'matching rank') ? 'visible' : 'hidden'}>
            <Background src={"/Img/match_bg.png"}></Background>
            <h1 visible={players[0] != undefined ? 'hidden' : 'visible'} className={dongle.className}>Matching...</h1>

            {/* <Card position='fixed' top="10vh" left='5vw' maxH='lg' maxW='2xs' w='full' h='full' borderRadius="50px" border="9px solid #000000"></Card> */}
            {/* <Card position='fixed' top="10vh" right="5vw" maxH='lg' maxW='2xs' w='full' h='full' borderRadius="50px" border="9px solid #000000"></Card> */}
            <Container color="transparent" visible={players[0] != undefined ? 'visible' : 'hidden'} width="40%" padding="0em" height="350px">
                <Container className={dongle.className} visible={((userRef.status == 'matching' || userRef.status == 'matching rank') && players[0] != undefined) ? 'visible' : 'hidden'} width="50%" height="100%" color="white" border="3px solid #000000" shadow="0px 9px 4px rgba(0, 0, 0, 0.35)">
                    <PictureFlex visible={((userRef.status == 'matching' || userRef.status == 'matching rank') && players[0] != undefined) ? 'visible' : 'hidden'} src={"/Img/monster1.png"} width="80%" mbottom="0" transform="rotate(12.1deg)"></PictureFlex>
                    <Picture visible={((userRef.status == 'matching' || userRef.status == 'matching rank') && players[0] != undefined) ? 'visible' : 'hidden'} src={"/Img/hand4.png"} width="6em" bottom="-2em" left="-3em" transform="rotate(-10deg);"></Picture>
                    <h2 className="player_match_label"><p>Player 1 </p><p className='player_match_name'>{userRef.inRoom != '' ? players[0]?.data().username : null}</p></h2></Container>
            </Container>

            <Container color="transparent" visible={((userRef.status == 'matching' || userRef.status == 'matching rank') && players[1] != undefined) ? 'visible' : 'hidden'} width="20%">
                <Picture src={"/Img/vs.png"} visible={((userRef.status == 'matching' || userRef.status == 'matching rank') && players[1] != undefined) ? 'visible' : 'hidden'} width="10em" top="-2em" left="4em" transform="rotate(12.1deg)"></Picture>
            </Container>

            <Container zindex="3" color="transparent" visible={((userRef.status == 'matching' || userRef.status == 'matching rank') && players[1] != undefined) ? 'visible' : 'hidden'} width="40%" padding="0em" height="350px">
                <Container className={dongle.className} visible={((userRef.status == 'matching' || userRef.status == 'matching rank') && players[1] != undefined) ? 'visible' : 'hidden'} width="50%" height="100%" color="white" border="3px solid #000000" shadow="0px 9px 4px rgba(0, 0, 0, 0.35)">
                    <PictureFlex visible={((userRef.status == 'matching' || userRef.status == 'matching rank') && players[1] != undefined) ? 'visible' : 'hidden'} src={"/Img/monster2.png"} width="60%" mbottom="5em" ></PictureFlex>
                    <Picture visible={((userRef.status == 'matching' || userRef.status == 'matching rank') && players[1] != undefined) ? 'visible' : 'hidden'} src={"/Img/hand1.png"} width="4.5em" bottom="-1em" right="-2em" transform="rotate(5deg);"></Picture>
                    <h2 className="player_match_label mon2"><p>Player 2</p><p className='player_match_name'>{userRef.inRoom != '' ? players[1]?.data().username : null}</p></h2></Container>
            </Container>
            <div style={{ position: 'fixed', bottom: '10vh', right: '15vw'}}>
                <BTN4 className={dongle.className} fontsize="1.5em" color="#ECC94B" onClick={userReady}>Ready </BTN4>
                <BTN4 className={dongle.className} margin='10px' fontsize="1.5em" color="#9F7AEA" onClick={destroyRoom}>Cancel</BTN4>
            </div>

        </ContainerFluid>
    );
}