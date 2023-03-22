import { Container } from "@/components/Container";
import { StyledInput } from "@/components/inputBar";
import { css } from "styled-components";
import styles from '@/styles/Home.module.css'
import { Button } from "@/components/Button";
import { useState } from "react";
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
    const [u_email, setEmail] = useState("");
    const [u_username, setUsername] = useState("");
    const [u_password, setPassword] = useState("");
    const [notice, setNotice] = useState("");

    const { getDocs, addDoc, collection, query, onSnapshot, where, getCountFromServer } = require("firebase/firestore");
    const { db } = require("./firebaseSetup")
    function handleClick() {
        console.log('increment like count');
      }
    async function signUp () {
        const q = query(collection(db, "users"), where("username", "==", u_username));
        const isValid = await getCountFromServer(q);
        if(!isValid){
          try {
            const docRef = await addDoc(collection(db, "users"), {
              email: u_email,
              username: u_username,
              password: u_password,
              rank: {
                title: "koy",
                point: 0
              },
              status: "offline"
            });
            console.log("Document written with ID: ", docRef.id);
          }
          catch (e) {
            console.error("sadsaf",e)
          }
        }
        else{
            setNotice("This username has already been used.")
        }
    }
    return (
        <>
            <style>{ style }</style>
            <main>
                <Container>
                    <h1>Sign up</h1>
                    <form>
                        <div className="inputBox">
                            <StyledInput type="email" name="email" id="email" onChange={ (e)=>(setEmail(e.target.value)) } placeholder=" " required pattern="\S+"></StyledInput>
                            <label>Email</label>
                        </div>
                        <div className="inputBox">
                            <StyledInput type="text" name="username" id="username" onChange={ (e)=>(setUsername(e.target.value)) } placeholder=" " required></StyledInput>
                            <label>Username</label>
                            <small>{ notice }</small>
                        </div>
                        <div className="inputBox">
                            <StyledInput type="password" name="password" id="password" onChange={ (e)=>(setPassword(e.target.value)) } placeholder=" " required></StyledInput>    
                            <label>Password</label>
                        </div>
                    </form>
                    <div className="inputBox right" ><Button onClick={ signUp }>sign up</Button></div>
                </Container>
            </main>
        </>
    )
}