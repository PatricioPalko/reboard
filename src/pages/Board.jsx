/* eslint-disable no-unused-vars */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { TaskGroup } from '../components/TaskGroup'
import { getTaskGroups, getBoard, createTask, getTasks } from '../utils/api'
import { useData } from '../hooks/useData'

const Board = () => {
  const { id } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [board, setBoard] = React.useState({})

  const fetchTaskGroups = React.useCallback(() => getTaskGroups(id), [id])
  const fetchTasks = React.useCallback(() => getTasks(id), [id])

  return (
    <Box minH="100vh" pos="relative">
      <TaskGroup
        boardId={id}
        // groupsCollection={groupsCollection}
        // refetchGroups={refetchGroups}
        // tasksCollection={tasksCollection}
        // refetchTasks={refetchTasks}
      />
    </Box>
  )
}

export default Board
