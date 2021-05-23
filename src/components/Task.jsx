import * as React from 'react'
import { Flex, Text } from '@chakra-ui/react'

import { getTasks } from '../utils/api'

// eslint-disable-next-line react/prop-types
export const Task = ({ boardId }) => {
  // const [status, setStatus] = React.useState('loading')
  const [tasks, setTask] = React.useState([])

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getTasks(boardId)
        setTask(data)
      }
      fetchData()
    } catch (e) {
      // donothing
    }
  }, [boardId])
  return (
    <Flex direction="column" bg="gray.200" p={9} mb={2}>
      {tasks.map((task) => (
        <>
          <Text>{task.name}</Text>
          <Text>{task.date}</Text>
        </>
      ))}
    </Flex>
  )
}
