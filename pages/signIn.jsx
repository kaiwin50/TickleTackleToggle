import { Container } from "@/components/Container";
import { StyledInput } from "@/components/inputBar";
import { css } from "styled-components";
import { Button } from "@/components/Button";
import { useState } from "react";
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



export default function signUpPage() {
    const [u_username, setUsername] = useState("");
    const [u_password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const { getDocs, collection, query, where, doc, setDoc, updateDoc } = require("firebase/firestore");
    const { db } = require("./api/firebaseSetup");
    const router = useRouter();
    async function signIn () {
        const q = query(collection(db, "users"), where("username", "==", u_username));
        const isExist = await getDocs(q);
        console.log(q);
        try{
            console.log(isExist.docs)
            const userID = isExist.docs[0].id;
            const userDoc = isExist.docs[0].data();
            console.log(doc);
            if(u_password == userDoc.password){
                console.log("successful login to ", userID)
                await updateDoc(doc(collection(db, "users"), userID), {
                    status : "online"
                });
                const local = `./home/${ userID }`
                router.push(local)
            }
            else{
                throw "wrong password"
            }
        }
        catch(e){
            setNotice("username or password is incorrect.");
            console.error("username or password is incorrect. :", e)
        }
        
    }
    return (
        <>
            <style>{ style }</style>
            <main className={styles.main}>
                <Container>
                    <h1>Sign In</h1>
                    <form>
                        <div className="inputBox">
                            <StyledInput type="text" name="username" id="username" onChange={ (e)=>(setUsername(e.target.value)) } placeholder=" " required></StyledInput>
                            <label>Username</label>
                        </div>
                        <div className="inputBox">
                            <StyledInput type="password" name="password" id="password" onChange={ (e)=>(setPassword(e.target.value)) } placeholder=" " required></StyledInput>    
                            <label>Password</label>
                        </div>
                    </form>
                    <small>{ notice }</small>
                    <div className="inputBox right" ><Button onClick={ signIn }>sign up</Button></div>
                </Container>
            </main>
        </>
    )
}