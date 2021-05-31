import * as React from 'react'
import { Heading, Button, Flex, Input, useDisclosure, useToast, Spinner } from '@chakra-ui/react'
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
  const { data: tasks, refetch: refetchTasks, isLoading } = useData(fetchTasks)
  const [taskNewName, setTaskNewName] = React.useState('')

  return (
    <>
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
        <Flex
          direction="column"
          border="2px"
          borderColor="white"
          backgroundColor="whiteAlpha.700"
          p={4}
          rounded={6}
          m={2}
          position="relative"
          overflowY="auto"
          maxHeight="95%"
          w="300px"
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
              backgroundColor="transparent"
              color="gray.700"
              onClick={(event) => {
                event.preventDefault()
                onOpen()
              }}
            >
              <EditIcon />
            </Button>
            <Button type="button" backgroundColor="transparent" color="gray.700" onClick={onDelete}>
              <DeleteIcon />
            </Button>
          </Flex>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            py={6}
            mb={2}
            rounded={6}
            bg="blackAlpha.600"
          >
            <Heading color="gray.50" my={3}>
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
                        status: 'info',
                        duration: 4000,
                        isClosable: true,
                      })
                    }
                  }}
                  onDelete={async (event) => {
                    event.preventDefault()
                    await removeTask(boardId, task.id)
                    refetchTasks()
                    toast({
                      title: `Task ${task.name} was deleted.`,
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                    })
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
            colorScheme="green"
            minH="40px"
            _hover={{
              bg: 'green.700',
              color: 'white',
            }}
            _active={{
              bg: 'green.700',
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
      )}
    </>
  )
}

TaskGroupPreview.propTypes = {
  boardId: PropTypes.string,
  title: PropTypes.string,
  onRename: PropTypes.func,
  onDelete: PropTypes.func,
  onTaskConfirm: PropTypes.func,
}
