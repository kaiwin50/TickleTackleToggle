import { Container } from "@/components/Container";
import { StyledInput } from "@/components/inputBar";
import { css } from "styled-components";
import { Button, CloseBtn } from "@/components/Button";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/Home.module.css'
import { heyComic, dongle } from "@/components/Font";
import Link from 'next/link'
import texture1 from '../public/Img/bg_texture1.png'
import { db } from "@/config/firebaseSetup";
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";

const style = css`
    div{
    }
    .inputBox{
        width: fit-content;
        height: fit-content;
        position: relative;
        margin: 2em;
    }
    h1{
        color: black;
        width: 100%;
        justify-content: center;
        display: flex;
    }
    .right{
        margin: 1em auto;
        pointer-events: unset;
    }
    small{
        color: red;
        font-size: .75em;
        display: block;
    }
    .title {
        color: #EDCE29;
        font-size : 5em;
        text-shadow: 1.5px 1.5px 0 #000,
        -1.5px 1.5px 0 #000,
        1.5px -1.5px 0 #000,
        -1.5px -1.5px 0 #000,
        0px 1.5px 0 #000,
        0px -1.5px 0 #000,
        -1.5px 0px 0 #000,
        1.5px 0px 0 #000,
        3px 3px 0 #000,
        -3px 3px 0 #000,
        3px -3px 0 #000,
        -3px -3px 0 #000,
        0px 3px 0 #000,
        0px -3px 0 #000,
        -3px 0px 0 #000,
        3px 0px 0 #000,
        1.5px 3px 0 #000,
        -1.5px 3px 0 #000,
        1.5px -3px 0 #000,
        -1.5px -3px 0 #000,
        3px 1.5px 0 #000,
        -3px 1.5px 0 #000,
        3px -1.5px 0 #000,
        -3px -1.5px 0 #000, 0px 10.5px 6px rgba(0, 0, 0, 0.6);
    }
`
export const ContextAuth = createContext()

export default function signInPage() {
    const [u_username, setUsername] = useState("");
    const [u_password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    // const { getDocs, collection, query, where, doc, setDoc, updateDoc, onSnapshot } = require("firebase/firestore");
    const { SignIn, default: auth } = require("./api/auth");
    const router = useRouter();
    async function formHandler(e) {
        e.preventDefault();
        const q = query(collection(db, "users"), where("username", "==", u_username));
        const isExist = await getDocs(q);
        console.log(q);
        try {
            console.log(isExist.docs)
            const userDoc = isExist.docs[0].data();
            console.log(doc);
            SignIn(userDoc.email, u_password, router);
        }
        catch (e) {
            setNotice("username or password is incorrect.");
            console.error("username or password is incorrect. :", e)
        }
    }
    useEffect(()=>{
        // const someTest = async () => {
        //     const users = await getDocs(collection(db, 'users'))
        //     users.docs.forEach(element => {
        //         console.log(element.data());
        //     });
        // }
        auth.onAuthStateChanged(user => {
            if(user){
                console.log('user: ', user)
                onSnapshot(doc(db, 'users', user.uid), userInfo => {
                    const data = userInfo.data();
                    console.log(data)
                    if(data.status == 'idle'){
                      router.push('home');                    
                    }
                    else if(data.status == 'playing'){
                      router.push(`/play/${data.inRoom}`);
                    }
                })
            }
            else{
                console.log(null);
            }
        })
    }, [])

    return (
        <>
            <style>{style}</style>
            <main className={styles.main} style={{
            backgroundImage: `url(${texture1.src})`,
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            }}>
                <ContextAuth.Provider value={u_username}>
                    <h2 className={[heyComic.className, "title"].join(" ")}>Tickle Tackle Toggle</h2>
                    <Container color="#F76363" border="3px solid #000000" shadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)" className={dongle.className}> 
                        <h1>LOG IN {u_username} </h1>
                        <Link href='./'><CloseBtn className={dongle.className}>x</CloseBtn></Link>
                        <form onSubmit={formHandler}>
                            <div className="inputBox">
                                <StyledInput type="text" name="username" id="username" onChange={(e) => (setUsername(e.target.value))} placeholder=" " required></StyledInput>
                                <label>Username</label>
                            </div>
                            <div className="inputBox">
                                <StyledInput type="password" name="password" id="password" onChange={(e) => (setPassword(e.target.value))} placeholder=" " required></StyledInput>
                                <label>Password</label>
                            </div>
                            <div className="inputBox right" ><Button type="submit" fontsize="1.3em"  className={dongle.className} fontcolor="black">Log In</Button></div>
                            <small>{notice}</small>
                        </form>
                    </Container>
                </ContextAuth.Provider>
            </main>
        </>
    )
}