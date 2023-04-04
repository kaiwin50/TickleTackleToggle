import { Container } from "@/components/Container";
import { StyledInput } from "@/components/inputBar";
import { css } from "styled-components";
import { Button } from "@/components/Button";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/Home.module.css'

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
        position: absolute;
        top: -.65em;
        color: white;
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
`
export const ContextAuth = createContext()

export default function signInPage() {
    const [u_username, setUsername] = useState("");
    const [u_password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const { getDocs, collection, query, where, doc, setDoc, updateDoc, onSnapshot } = require("firebase/firestore");
    const { SignIn, default: auth } = require("./api/auth");
    const { db } = require("./api/firebaseSetup");
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
                      router.push(`../play/${data.inRoom}`);
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
            <main className={styles.main}>
                <ContextAuth.Provider value={u_username}>
                    <Container>
                        <h1>Sign In {u_username} </h1>
                        <form onSubmit={formHandler}>
                            <div className="inputBox">
                                <StyledInput type="text" name="username" id="username" onChange={(e) => (setUsername(e.target.value))} placeholder=" " required></StyledInput>
                                <label>Username</label>
                            </div>
                            <div className="inputBox">
                                <StyledInput type="password" name="password" id="password" onChange={(e) => (setPassword(e.target.value))} placeholder=" " required></StyledInput>
                                <label>Password</label>
                            </div>
                            <div className="inputBox right" ><Button type="submit">sign up</Button></div>
                            <small>{notice}</small>
                        </form>
                    </Container>
                </ContextAuth.Provider>
            </main>
        </>
    )
}