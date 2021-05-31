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
  Spinner,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { createBoard, getBoards, removeBoard, updateBoard } from '../utils/api'
import { BoardPreview } from '../components/BoardPreview'
import { useData } from '../hooks/useData'
import bg2 from '../assets/img/bg2.jpg'

const Boards = () => {
  const [boardText, setBoardText] = React.useState('')
  const fetchBoards = React.useCallback(() => getBoards(), [])

  const { data: boards, refetch: refetchBoards, isLoading } = useData(fetchBoards)
  const toast = useToast()

  return (
    <>
      <Box
        background={`url(${bg2}) rgba(24,0,33,0.5) center / cover no-repeat`}
        backgroundBlendMode="multiply"
        height="25vh"
      >
        <Center h="25vh">
          <div>
            <Heading color="white" textAlign="center" mb="2">
              Boards
            </Heading>
          </div>
        </Center>
      </Box>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position="fixed"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        />
      ) : (
        <Box>
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
                        toast({
                          title: `Board with title ${boardText} was created. 🎉`,
                          status: 'success',
                          duration: 4000,
                          isClosable: true,
                        })
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
                            status: 'info',
                            duration: 4000,
                            isClosable: true,
                          })
                        }
                      }}
                      onDelete={async (event) => {
                        event.preventDefault()
                        await removeBoard(item.id)
                        refetchBoards()
                        toast({
                          title: `Board ${item.name} was deleted.`,
                          status: 'success',
                          duration: 4000,
                          isClosable: true,
                        })
                      }}
                    />
                  ))}
                </Box>
              </GridItem>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  )
}

export default Boards
