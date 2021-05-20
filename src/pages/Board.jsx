import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import { getBoard } from '../utils/api'
import { TaskGroup } from '../components/TaskGroup'

const Board = () => {
  const { id } = useParams()
  // const [status, setStatus] = React.useState('loading')
  const [board, setBoard] = React.useState({})

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoard(id)

        setBoard(data)
      }
      fetchData()
    } catch (e) {
      // do nothing
    }
  }, [id])

  return (
    <Box h="100vh">
      <TaskGroup boardId={board.id} />
    </Box>
  )
}

export default Board
