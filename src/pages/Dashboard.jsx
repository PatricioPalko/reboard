import * as React from 'react'
import { Box, Center, Heading, Container, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import bg3 from '../assets/img/bg3.jpg'

const Dashboard = () => {
  return (
    <>
      <Box
        background={`url(${bg3}) rgba(24,0,33,0.5) center / cover no-repeat`}
        backgroundBlendMode="multiply"
        minH="calc(100vh - 80px)"
      >
        <Center h="25vh" flexDirection="column" pos="relative">
          <Heading color="white" textAlign="center" mb="2">
            Dashboard
          </Heading>
          <Text color="whiteAlpha.600" pos="absolute" mt={20}>
            by Stefan & Patrik
          </Text>
        </Center>
        <Container maxW="container.xl">
          <Center
            flexDirection="column"
            pos="absolute"
            left={0}
            right={0}
            bottom={0}
            top={0}
            mt="70px"
          >
            <Button as={Link} to="/boards" p={5} backgroundColor="whiteAlpha.700" size="lg">
              Check out our trello board 🤘
            </Button>
          </Center>
        </Container>
      </Box>
    </>
  )
}

export default Dashboard
