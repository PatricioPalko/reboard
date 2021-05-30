import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
} from '@chakra-ui/react'
import * as React from 'react'
import PropTypes from 'prop-types'

export function ModalWindow({
  modalTitle,
  modalHeader,
  modalFirstText,
  modalSecondText,
  onConfirm,
  bottomContent,
  isOpen,
  onClose,
}) {
  const [newTitle, setNewTitle] = React.useState('')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <span>{modalFirstText}</span>
          <Input type="text" value={modalTitle} isDisabled />
          <span>{modalSecondText}</span>
          <Input
            type="text"
            placeholder="Set new name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
        </ModalBody>

        <ModalFooter>
          {bottomContent}
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => {
              onConfirm(newTitle)
              setNewTitle('')
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
  )
}

ModalWindow.propTypes = {
  modalTitle: PropTypes.string,
  modalHeader: PropTypes.string,
  modalFirstText: PropTypes.string,
  modalSecondText: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  bottomContent: PropTypes.string,
}
