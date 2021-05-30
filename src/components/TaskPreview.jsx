import * as React from 'react'
import { Text, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'
import { ModalWindow } from './ModalWindow'

export const TaskPreview = ({ title, onRename, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex direction="column" bg="gray.200" p={9} mb={2} pos="relative">
      <Text>{title}</Text>
      <ModalWindow
        modalTitle={title}
        onConfirm={(newBoardName) => {
          onRename(newBoardName, onClose)
        }}
        isOpen={isOpen}
        onClose={onClose}
        modalHeader="Edit name of task"
        modalFirstText="Current name of task"
        modalSecondText="New name of task"
      />
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
      <Button
        type="button"
        pos="absolute"
        right="0"
        top="0"
        backgroundColor="transparent"
        size="xs"
        color="gray.500"
        onClick={onDelete}
      >
        <DeleteIcon />
      </Button>
    </Flex>
  )
}

TaskPreview.propTypes = {
  title: PropTypes.string,
  onRename: PropTypes.func,
  onDelete: PropTypes.func,
}
