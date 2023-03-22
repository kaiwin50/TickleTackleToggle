import { Container } from "@/components/Container";
import { StyledInput } from "@/components/inputBar";
import { css } from "styled-components";
import styles from '@/styles/Home.module.css'
import { Button } from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/router";
const style = css`
    body{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding:5rem;
        max-height: 100vh;
        overflow: hidden;
    }
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
    const { getDocs, collection, query, where, updateDoc, setDoc, writeBatch } = require("firebase/firestore");
    const { db } = require("./firebaseSetup");
    const router = useRouter();
    async function signIn () {
        const q = query(collection(db, "users"), where("username", "==", u_username));
        const isExist = await getDocs(q);
        console.log(q);
        if (isExist != undefined){
            const userRef = isExist.docs[0];
            const userID = isExist.docs[0].id;
            const doc = isExist.docs[0].data();
            console.log(doc);
            if(u_password == doc.password){
                console.log("successful login to ", userID)
                const local = `./home/${ userID }_${ doc.username }`
                router.push(local)
            }
            else{
                setNotice("username or password is incorrect.");
                console.error("username or password is incorrect.");
            }
        }
        
    }
    return (
        <>
            <style>{ style }</style>
            <main>
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