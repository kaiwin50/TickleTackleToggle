import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

const style = css`
  ul{
    list-style-type: none;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin: auto;
  }
  li {
    display: inline-flex;
    margin-left: 1em;
    margin-right: 1em;
  }
`

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{ style }</style>
      </Head>
      <main className={styles.main}>
        <Container width="80%">
          <ul>
            <li><a href='./signIn'><Button>Sign In</Button></a></li>
            <li><a href='./signUp'><Button>sign up</Button></a></li>
          </ul>
        </Container>
      </main>
    </>
  )
}
