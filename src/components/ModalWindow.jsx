import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  useToast,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import * as React from 'react'
import PropTypes from 'prop-types'
import { updateBoard } from '../utils/api'

export function ModalWindow({ boardTitle, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [boardNewText, setBoardNewText] = React.useState('')
  const toast = useToast()

  return (
    <>
      <Button
        type="button"
        pos="absolute"
        top="0"
        left="0"
        backgroundColor="transparent"
        size="xs"
        onClick={(event) => {
          event.preventDefault()
          onOpen()
        }}
      >
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit name of board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <span>Current name of board</span>
            <Input type="text" value={boardTitle} isDisabled />
            <span>New name of board</span>
            <Input
              type="text"
              placeholder="Set new name"
              value={boardNewText}
              onChange={(e) => setBoardNewText(e.target.value)}
              autoFocus
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                if (boardNewText) {
                  updateBoard(id, { name: boardNewText })
                  setBoardNewText('')
                  onClose()
                  toast({
                    title: 'Board renamed.',
                    description: `We are renamed your board from ${boardTitle} to ${boardNewText}.`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                }
              }}
            >
              Save
            </Button>
            <Button colorScheme="red" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

ModalWindow.propTypes = {
  boardTitle: PropTypes.string,
  id: PropTypes.number,
}
