/* eslint-disable react/prop-types */
import * as React from 'react'
import { Flex, Heading, Button, Text, Input } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { createTask, createTaskGroup } from '../utils/api'

// eslint-disable-next-line react/prop-types
export const TaskGroup = ({
  boardId,
  groupsCollection,
  refetchGroups,
  tasksCollection,
  refetchTasks,
}) => {
  // const [status, setStatus] = React.useState('loading')
  const [taskGroupName, setTaskGroupName] = React.useState('')
  const [taskGroups, setTaskGroups] = React.useState([{ id: '', name: '', tasks: [] }])

  React.useEffect(() => {
    const taskGroupsCollection = []

    groupsCollection.forEach((group) => {
      const { id, name } = group
      const tasks = tasksCollection.filter((task) => group.taskIds.includes(task.id))
      const newTaskGroup = { id, name, tasks }
      taskGroupsCollection.push(newTaskGroup)
    })
    setTaskGroups(taskGroupsCollection)
  }, [groupsCollection, tasksCollection])

  const addNewTaskGroup = async (name) => {
    if (name) {
      await createTaskGroup(boardId, name)
      refetchGroups()
      refetchTasks()
      setTaskGroupName('')
    }
  }

  const addNewTask = async (e, groupId) => {
    e.preventDefault()
    const titleText = e.target.elements[`taskTitle-${groupId}`].value
    if (titleText) {
      await createTask(boardId, groupId, { name: titleText })
      refetchGroups()
      refetchTasks()
      e.target.elements[`taskTitle-${groupId}`].value = ''
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      {taskGroups.map((group) => (
        <Flex
          direction="column"
          background="green.100"
          p={12}
          rounded={6}
          mr={2}
          ml={2}
          key={group.id}
        >
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
              {group.name}
            </Heading>
          </Flex>
          {group.tasks.map((task) => {
            return (
              <Flex direction="column" bg="gray.200" p={9} mb={2} key={task.id}>
                <Text key={task.id}>{task.name}</Text>
              </Flex>
            )
          })}
          <form onSubmit={(e) => addNewTask(e, group.id)}>
            <Input type="text" placeholder="Enter a title" id={`taskTitle-${group.id}`} />
            <Button type="submit" m={2}>
              <AddIcon w={3} h={3} mr={2} />
              Add task
            </Button>
          </form>
        </Flex>
      ))}
      <Flex direction="column" background="green.100" p={6} rounded={6}>
        <Input
          type="text"
          placeholder="Enter name for task list"
          onChange={(e) => setTaskGroupName(e.target.value)}
          value={taskGroupName}
        />
        <Button colorScheme="green" onClick={() => addNewTaskGroup(taskGroupName)}>
          <AddIcon w={3} h={3} mr={2} />
          Add another lists
        </Button>
      </Flex>
    </Flex>
  )
}
