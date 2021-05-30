import * as React from 'react'
import {
  Box,
  Center,
  Heading,
  Container,
  Grid,
  GridItem,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { createBoard, getBoards, removeBoard, updateBoard } from '../utils/api'
import { BoardPreview } from '../components/BoardPreview'
import { useData } from '../hooks/useData'

const Boards = () => {
  // const [status, setStatus] = React.useState('loading')
  const [boardText, setBoardText] = React.useState('')
  const fetchBoards = React.useCallback(() => getBoards(), [])

  const { data: boards, refetch: refetchBoards } = useData(fetchBoards)
  // const [boardNewText, setBoardNewText] = React.useState('')
  const toast = useToast()

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
                onClick={async () => {
                  if (boardText) {
                    await createBoard(boardText)
                    refetchBoards()
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
              {boards?.map((item) => (
                <BoardPreview
                  key={item.id}
                  linkTo={String(item.id)}
                  title={item.name}
                  onRename={async (newBoardName, closeModal) => {
                    if (newBoardName) {
                      await updateBoard(item.id, { name: newBoardName })
                      closeModal()
                      refetchBoards()
                      toast({
                        title: 'Board renamed.',
                        description: `We are renamed your board from ${item.name} to ${newBoardName}.`,
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      })
                    }
                  }}
                  onDelete={async (event) => {
                    event.preventDefault()
                    await removeBoard(item.id)
                    refetchBoards()
                  }}
                />
              ))}
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </>
  )
}

export default Boards
