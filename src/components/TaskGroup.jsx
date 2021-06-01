import * as React from 'react'
import { Flex, Button, Input, useToast, Spinner } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'
import {
  createTask,
  createTaskGroup,
  getTaskGroups,
  removeTaskGroup,
  updateTaskGroup,
} from '../utils/api'
import { useData } from '../hooks'
import { TaskGroupPreview } from './TaskGroupPreview'
import bg1 from '../assets/img/bg1.jpg'

export const TaskGroup = ({ boardId }) => {
  // const [status, setStatus] = React.useState('loading')
  const [taskGroupName, setTaskGroupName] = React.useState('')
  const fetchTaskGroups = React.useCallback(() => getTaskGroups(boardId), [boardId])
  const toast = useToast()
  const { data: taskGroups, refetch: refetchTaskGroups, isLoading } = useData(fetchTaskGroups)

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
          pos="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          alignItems="flex-start"
          background={`url(${bg1}) center / cover no-repeat`}
        >
          {taskGroups.map((group) => (
            <TaskGroupPreview
              key={group.id}
              taskGroupId={group.id}
              boardId={boardId}
              title={group.name}
              taskGroupInfo={group.taskIds}
              onRename={async (newTaskGroupName, closeModal) => {
                if (newTaskGroupName) {
                  await updateTaskGroup(group.id, { name: newTaskGroupName })
                  closeModal()
                  refetchTaskGroups()
                  toast({
                    title: 'Taskgroup renamed.',
                    description: `We are renamed your taskgroup from ${group.name} to ${newTaskGroupName}.`,
                    status: 'info',
                    duration: 4000,
                    isClosable: true,
                  })
                }
              }}
              onDelete={async (event) => {
                event.preventDefault()
                await removeTaskGroup(group.id)
                refetchTaskGroups()
                toast({
                  title: `Taskgroup ${group.name} was deleted.`,
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                })
              }}
              onTaskConfirm={async (taskNewName) => {
                if (taskNewName) {
                  await createTask(boardId, group.id, { name: taskNewName })
                  await refetchTaskGroups()
                  toast({
                    title: `Task with title ${taskNewName} was created. 🎉`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  })
                }
              }}
            />
          ))}
          <Flex
            direction="column"
            p={6}
            rounded={6}
            m={2}
            border="2px"
            borderColor="white"
            backgroundColor="whiteAlpha.700"
          >
            <Input
              type="text"
              placeholder="Enter name for task list"
              onChange={(e) => setTaskGroupName(e.target.value)}
              value={taskGroupName}
              backgroundColor="white"
              mb={2}
            />
            <Button
              colorScheme="green"
              onClick={async () => {
                if (taskGroupName) {
                  await createTaskGroup(boardId, taskGroupName)
                  refetchTaskGroups()
                  setTaskGroupName('')
                  toast({
                    title: `Taskgroup with title ${taskGroupName} was created. 🎉`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  })
                }
              }}
            >
              <AddIcon w={3} h={3} mr={2} />
              Add another lists
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  )
}

TaskGroup.propTypes = {
  boardId: PropTypes.string,
}
