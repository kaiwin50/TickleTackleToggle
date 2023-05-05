import { Flex, Text, Avatar } from '@chakra-ui/react'
import { dongle } from '@/components/Font'

const LeaderboardItem = ({ name, rank, point, color="lightgrey" }) => {
    return (
        <Flex justify="space-around" w="full" bg={color} align="center" borderRadius="20px" minH="20" className={dongle.className}>
            <Flex flex={2} gap="4" align="center" justify={['center', 'flex-start']}>
                <Avatar ml="8" borderWidth="2px" borderColor="black" display={['none', 'block']}></Avatar>
                <Text fontSize="4xl">{name}</Text>
            </Flex>
            <Text fontSize="4xl" flex={1}>{rank}</Text>
            <Text fontSize="4xl" flex={1}>{point}</Text>
        </Flex>
    )
}

export default LeaderboardItem;
