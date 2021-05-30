import * as React from 'react'
import { Flex, Button, Input, useToast } from '@chakra-ui/react'
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

export const TaskGroup = ({ boardId }) => {
  // const [status, setStatus] = React.useState('loading')
  const [taskGroupName, setTaskGroupName] = React.useState('')
  const fetchTaskGroups = React.useCallback(() => getTaskGroups(boardId), [boardId])
  const toast = useToast()
  const { data: taskGroups, refetch: refetchTaskGroups } = useData(fetchTaskGroups)

  return (
    <Flex pos="absolute" left="0" right="0" top="0" bottom="0">
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
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            }
          }}
          onDelete={async (event) => {
            event.preventDefault()
            await removeTaskGroup(group.id)
            refetchTaskGroups()
          }}
          onTaskConfirm={async (taskNewName) => {
            if (taskNewName) {
              await createTask(Number(boardId), group.id, { name: taskNewName })
              refetchTaskGroups()
            }
          }}
        />
      ))}
      <Flex direction="column" background="green.100" p={6} rounded={6} m={2}>
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
              await createTaskGroup(Number(boardId), taskGroupName)
              refetchTaskGroups()
              setTaskGroupName('')
            }
          }}
        >
          <AddIcon w={3} h={3} mr={2} />
          Add another lists
        </Button>
      </Flex>
    </Flex>
  )
}

TaskGroup.propTypes = {
  boardId: PropTypes.string,
}
