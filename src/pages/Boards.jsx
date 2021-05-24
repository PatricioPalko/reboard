import * as React from 'react'
import { Box, Center, Heading, Container, Grid, GridItem, Input, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { createBoard, getBoards, removeBoard } from '../utils/api'
import { ModalWindow } from '../components/ModalWindow'
import { useData } from '../hooks/useData'

const Boards = () => {
  // const [status, setStatus] = React.useState('loading')
  const [boardText, setBoardText] = React.useState('')

  const { data: boards } = useData(getBoards)

  return (
    <>
      <Box
        background={`url('https://picsum.photos/1680/500') rgba(24,0,33,0.5) center / cover no-repeat`}
        backgroundBlendMode="multiply"
        height="20vh"
      >
        <Center h="20vh">
          <div>
            <Heading color="white" textAlign="center" mb="2">
              Boards
            </Heading>
          </div>
        </Center>
      </Box>
      <Container maxW="container.xl" pt="10">
        <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(24, 1fr)" gap={6}>
          <GridItem colSpan={24} w="100%">
            <Box d="flex">
              <Box flex="0 0 25%" flexBasis="calc(25% - 24px)" mx="3">
                <Input
                  type="text"
                  placeholder="Name of new board"
                  onChange={(e) => setBoardText(e.target.value)}
                  value={boardText}
                  mr="20px"
                />
              </Box>
              <Button
                mx="3"
                variant="outline"
                borderColor="gray.400"
                _hover={{
                  bg: 'gray.700',
                  color: 'white',
                }}
                _active={{
                  bg: 'gray.700',
                  color: 'white',
                }}
                leftIcon={<AddIcon />}
                onClick={() => {
                  if (boardText) {
                    createBoard(boardText)
                    setBoardText('')
                  }
                }}
              >
                Add
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Container>
      <Container maxW="container.xl" py="10">
        <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(24, 1fr)" gap={6}>
          <GridItem colSpan={24} w="100%">
            <Box d="flex" flexWrap="wrap">
              {boards?.map((item) => {
                return (
                  <Box
                    as={Link}
                    to={String(item.id)}
                    pos="relative"
                    maxW="sm"
                    borderRadius="md"
                    overflow="hidden"
                    shadow="base"
                    flex="0 0 25%"
                    flexBasis="calc(25% - 24px)"
                    m="3"
                    minH="70px"
                    _hover={{
                      shadow: 'lg',
                    }}
                    key={item.id}
                    p="5"
                    borderWidth="3px"
                    borderStyle="solid"
                    borderColor="blue.400"
                    fontWeight="semibold"
                  >
                    <ModalWindow boardTitle={item.name} id={item.id} />
                    <Button
                      type="button"
                      pos="absolute"
                      right="0"
                      top="0"
                      backgroundColor="transparent"
                      size="xs"
                      color="gray.500"
                      onClick={(event) => {
                        event.preventDefault()
                        removeBoard(item.id)
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                    {item.name}
                  </Box>
                )
              })}
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </>
  )
}

export default Boards
