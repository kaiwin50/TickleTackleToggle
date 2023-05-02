import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { css } from 'styled-components'
import { Container } from '@/components/Container'
import { CloseBtn } from '@/components/Button'
import Link from 'next/link'
import { useEffect } from 'react'
import auth, { c_user } from './api/auth'
import { dongle,heyComic } from '@/components/Font'
import texture1 from '../public/Img/bg_texture1.png'
import { Flex, Text, Avatar } from '@chakra-ui/react'
import LeaderboardItem from '@/components/LeaderboardItem'

const style = css`
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
`
export default function Leaderboard() {
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
      <Flex bgColor="#8B89F7" bgImage="/Img/bg_texture1.png" bgRepeat="no-repeat" bgSize="cover" w="full" h="100vh" justify="center" align="flex-end">
        <Flex direction="column" position="relative" borderWidth='5px' borderBottom="0" maxW="4xl" maxH="2xl" align="center" borderColor="black" borderRadius="20px 20px 0 0" h="full" w='full' background="#ECD352">
            <Flex h="full" align="center">
                <Text fontSize="6xl" color="white" style={{ WebkitTextStrokeColor: 'black', WebkitTextStrokeWidth: '3px' }} className={heyComic.className}>Leaderboard</Text>
            </Flex>
            <Link href='/home'><CloseBtn className={dongle.className} right="-.5em">x</CloseBtn></Link>
            <Flex direction="column" boxShadow="24px 20px 5px rgba(0, 0, 0, 0.25)" bg="white" p="2rem 2rem 0 2rem" w="80%" h="full" borderRadius="30px 30px 0 0" maxH="lg">
                <Flex className={dongle.className}>
                    <Text fontSize="4xl" flex={2} textAlign="center">Name</Text>
                    <Text fontSize="4xl" flex={1}>Rank</Text>
                    <Text fontSize="4xl" flex={1}>Point</Text>
                </Flex>
                <Flex w="full" gap="4" direction="column" position="relative" overflowY="auto" py="2">
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555" color="#FF6839D6"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555" color="#EC7752BD"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555" color="#ECA552BD"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555" color="#ECB852BD"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                    <LeaderboardItem name="DowNy" rank="Conquerer" point="555"></LeaderboardItem>
                </Flex>
            </Flex>
        </Flex>
      </Flex>
    </>
  )
}