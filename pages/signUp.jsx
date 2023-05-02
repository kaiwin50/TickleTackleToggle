import { Container } from "@/components/Container";
import { StyledInput } from "@/components/inputBar";
import { css } from "styled-components";
import { Button, CloseBtn } from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/Home.module.css'
import Head from "next/head";
import { heyComic, dongle } from "@/components/Font";
import Link from 'next/link'
import { Picture } from '@/components/Image'
import texture1 from '../public/Img/bg_texture1.png'
const style = css`

    div{
    }
    
    .inputBox{
        width: fit-content;
        height: fit-content;
        position: relative;
        margin: 2em;
    }
    h2{
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
    label {
        font-size: 1.2em;
    }
`


export default function signUpPage() {
    const [u_email, setEmail] = useState("");
    const [u_username, setUsername] = useState("");
    const [u_password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const router = useRouter();

    const { addDoc, collection, query, where, getCountFromServer } = require("firebase/firestore");
    const { db } = require("../config/firebaseSetup")
    const { SignUp } = require('./api/auth');

    async function formHandler (e) {
        e.preventDefault();
        const q = query(collection(db, "users"), where("username", "==", u_username));
        const isValid = await getCountFromServer(q);
        console.log(isValid.data().count)
        if(isValid.data().count == 0){
          try {
            SignUp(u_email, u_username, u_password, router);
          }
          catch (e) {
            console.error(e.message)
          }
        }
        else{
            setNotice("This username has already been used.")
        }
    }
    return (
        <>
            <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{ style }</style>
      </Head>
      <main className={styles.main} style={{
      backgroundImage: `url(${texture1.src})`,
      height: '100vh',
      backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    }}>
                <Container color="#ECD352" border="4px solid #000000" shadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)" width="40%" className={dongle.className}>
                    <h2 className={heyComic.className}>Create New Account</h2>
                    <Link href='./'><CloseBtn className={dongle.className}>x</CloseBtn></Link>
                    <Picture src={"/Img/hand1.png"} width="4em" top="-2em" left="-2em" transform="rotate(12.1deg)"></Picture>
                    <Picture src={"/Img/hand2.png"} width="4em" bottom="-1em" left="-2em" transform="matrix(-0.96, 0.26, 0.26, 0.96, 0, 0)"></Picture>
                    <Picture src={"/Img/hand3.png"} width="4em" bottom="-1em" right="-2em" transform="rotate(10.92deg)"></Picture>
                    <form onSubmit={ formHandler }>
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
                        <div className="inputBox right" ><Button type="submit" className={dongle.className} fontsize="1.3em" color="#E53E3E" fontcolor="white">Register</Button></div>
                    </form>
                </Container>
      </main>
    </>
        </>
    )
}
