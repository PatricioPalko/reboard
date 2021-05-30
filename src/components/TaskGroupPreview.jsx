import * as React from 'react'
import { Heading, Button, Flex, Input, useDisclosure, useToast } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'
import { ModalWindow } from './ModalWindow'
import { getTasks, removeTask, updateTask } from '../utils/api'
import { useData } from '../hooks'
import { TaskPreview } from './TaskPreview'

export const TaskGroupPreview = ({
  boardId,
  // eslint-disable-next-line react/prop-types
  taskGroupInfo,
  title,
  onRename,
  onDelete,
  onTaskConfirm,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const fetchTasks = React.useCallback(() => getTasks(boardId), [boardId])
  const { data: tasks, refetch: refetchTasks } = useData(fetchTasks)
  const [taskNewName, setTaskNewName] = React.useState('')

  return (
    <Flex
      direction="column"
      background="green.100"
      p={12}
      rounded={6}
      m={2}
      position="relative"
      overflowY="scroll"
      height="100%"
    >
      <Flex justifyContent="space-between">
        <ModalWindow
          modalTitle={title}
          onConfirm={(newBoardName) => {
            onRename(newBoardName, onClose)
          }}
          isOpen={isOpen}
          onClose={onClose}
          modalHeader="Edit name of taskgroup"
          modalFirstText="Current name of taskgroup"
          modalSecondText="New name of taskgroup"
        />
        <Button
          onClick={(event) => {
            event.preventDefault()
            onOpen()
          }}
        >
          <EditIcon />
        </Button>
        <Button type="button" onClick={onDelete}>
          <DeleteIcon />
        </Button>
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg="red.200"
        p={6}
        mb={2}
        rounded={6}
      >
        <Heading color="gray.50" mb={6}>
          {title}
        </Heading>
      </Flex>
      {tasks
        // eslint-disable-next-line react/prop-types
        .filter((task) => taskGroupInfo.includes(task.id))
        .map((task) => {
          return (
            <TaskPreview
              key={task.id}
              title={task.name}
              onRename={async (newTaskName, closeModal) => {
                if (newTaskName) {
                  await updateTask(task.id, { ...task, name: newTaskName })
                  refetchTasks()
                  closeModal()
                  toast({
                    title: 'Task renamed.',
                    description: `We are renamed your task from ${task.name} to ${newTaskName}.`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                }
              }}
              onDelete={async (event) => {
                event.preventDefault()
                await removeTask(boardId, task.id)
                refetchTasks()
              }}
            />
          )
        })}
      <Input
        type="text"
        placeholder="Name of new task"
        onChange={(e) => setTaskNewName(e.target.value)}
        value={taskNewName}
        mt="20px"
        mb="10px"
        backgroundColor="white"
        minH="40px"
      />
      <Button
        type="button"
        mx="3"
        variant="outline"
        borderColor="gray.400"
        minH="40px"
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
          onTaskConfirm(taskNewName)
          refetchTasks()
          setTaskNewName('')
        }}
      >
        Add
      </Button>
    </Flex>
  )
}

TaskGroupPreview.propTypes = {
  boardId: PropTypes.string,
  title: PropTypes.string,
  onRename: PropTypes.func,
  onDelete: PropTypes.func,
  onTaskConfirm: PropTypes.func,
}
