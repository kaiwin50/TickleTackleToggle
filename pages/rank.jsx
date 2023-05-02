import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container } from '@/components/Container'
import { Button, CloseBtn } from '@/components/Button'
import Link from 'next/link'
import { useEffect } from 'react'
import auth, { c_user } from './api/auth'
import { dongle,heyComic } from '@/components/Font'
import texture2 from '../public/Img/bg_texture2.png'
import { PictureFlex } from '@/components/Image'


const style = css`
    
`
export default function Friends() {
  useEffect(()=>{
    console.log(c_user)
  }, [])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{ style }</style>
      </Head>
      <main className={styles.main} style={{
      backgroundImage: `url(${texture2.src})`,
      width: '100vw',
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'contain',
    }}>
        <Container width="100%" bdradius="0%" color="transparent" >
            <Container width="50%" height="100%" bdradius="0%" color="transparent" >
            <Link href='/home'><CloseBtn className={dongle.className}>x</CloseBtn></Link>
                <PictureFlex src={"/Img/rank.png"} width="70%"></PictureFlex>
                <PictureFlex src={"/Img/hand0.png"} width="40%" mtop="-65%"></PictureFlex>
            </Container>
            <Container width="50%" bdradius="0%" height="100%" color="transparent" >
                <Container width="100%" bdradius="0%" color="transparent">
                    <Container color="#F0F341" bdradius="50%" shadow="11px 16px 4px rgba(0, 0, 0, 0.25)" width="5em" height="5em"></Container>
                </Container>
                <Container width="50%" bdradius="0%" color="transparent">
                    <Container color="#F0F341" bdradius="50%" shadow="11px 16px 4px rgba(0, 0, 0, 0.25)" width="5em" height="5em"></Container>
                </Container>
                <Container width="50%" bdradius="0%" color="transparent">
                    <Container color="#F0F341" bdradius="50%" shadow="11px 16px 4px rgba(0, 0, 0, 0.25)" width="5em" height="5em"></Container>
                </Container>
                <Container width="100%" bdradius="0%" color="transparent">
                    <Button padding="2em" color="#ECC94B" className={dongle.className} fontsize="2em" shadow="0px 4px 4px rgba(0, 0, 0, 0.25)">Start</Button>
                </Container>
            </Container>
        </Container>
        

        
      </main>
    </>
  )
}
