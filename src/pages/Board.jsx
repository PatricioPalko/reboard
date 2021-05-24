import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Flex, Button, Input, Heading, Text } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { createTaskGroup, getTaskGroups, createTask, getTasks } from '../utils/api'
// import { TaskGroup } from '../components/TaskGroup'
import { useData } from '../hooks'

const Board = () => {
  const { id } = useParams()
  // const [status, setStatus] = React.useState('loading')
  // const [board, setBoard] = React.useState([])
  // const fetchBoard = React.useCallback(() => getBoard(id), [id])
  // const { data: board } = useData(fetchBoard)
  const [groupTitleText, setGroupTitleText] = React.useState('')
  const [titleText, setTitleText] = React.useState('')
  const fetchTaskGroups = React.useCallback(() => getTaskGroups(id), [id])

  const { data: groups, refetch: refetchGroups } = useData(fetchTaskGroups)
  const fetchTasks = React.useCallback(() => getTasks(id), [id])

  const { data: tasks, refetch: refetchTasks } = useData(fetchTasks)

  return (
    <Flex>
      {groups.map((group) => (
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
          {tasks
            .filter((task) => group.taskIds.includes(task.id))
            .map((task) => {
              return (
                <Flex direction="column" bg="gray.200" p={9} mb={2} key={task.id}>
                  <Text key={task.id}>{task.name}</Text>
                </Flex>
              )
            })}
          <Input
            type="text"
            id={group.id}
            placeholder="Enter a title"
            onChange={(e) => {
              setTitleText(e.target.value)
            }}
            // value={titleText}
          />
          <Button
            m={2}
            onClick={async () => {
              if (titleText) {
                await createTask(id, group.id, { name: titleText })
                refetchGroups()
                refetchTasks()
                setTitleText('')
              }
            }}
          >
            <AddIcon w={3} h={3} mr={2} />
            Add task
          </Button>
        </Flex>
      ))}
      <Flex direction="column" background="green.100" p={6} rounded={6} mr={2} ml={2}>
        <Input
          type="text"
          placeholder="Enter a title of list"
          onChange={(e) => setGroupTitleText(e.target.value)}
          value={groupTitleText}
        />
        <Button
          colorScheme="green"
          onClick={async () => {
            if (groupTitleText) {
              await createTaskGroup(id, groupTitleText)
              refetchGroups()
              setGroupTitleText('')
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
export default Board
