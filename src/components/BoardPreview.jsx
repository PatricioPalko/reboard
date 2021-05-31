import * as React from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ModalWindow } from './ModalWindow'

export const BoardPreview = ({ linkTo, title, onRename, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      as={Link}
      to={linkTo}
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
      p="5"
      borderWidth="3px"
      borderStyle="solid"
      borderColor="blue.400"
      fontWeight="semibold"
    >
      <ModalWindow
        modalTitle={title}
        onConfirm={(newBoardName) => {
          onRename(newBoardName, onClose)
        }}
        // bottomContent={<h1>Hello World!</h1>}
        isOpen={isOpen}
        onClose={onClose}
        modalHeader="Edit name of board"
        modalFirstText="Current name of board"
        modalSecondText="New name of board"
      />
      <Button
        type="button"
        pos="absolute"
        top="0"
        left="0"
        backgroundColor="transparent"
        size="xs"
        color="gray.500"
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
      {title}
    </Box>
  )
}

BoardPreview.propTypes = {
  title: PropTypes.string,
  linkTo: PropTypes.string,
  onRename: PropTypes.func,
  onDelete: PropTypes.func,
}
