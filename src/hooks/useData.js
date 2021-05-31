import * as React from 'react'
// import { getTaskGroups } from '../utils/api'

export const useData = (getDataFn) => {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchData = React.useCallback(async () => {
    const tmpdata = await getDataFn()
    setData(tmpdata)
  }, [getDataFn])

  React.useEffect(() => {
    try {
      setIsLoading(true)
      fetchData()
    } catch (e) {
      // do nothing
    } finally {
      setIsLoading(false)
    }
  }, [fetchData])

  return {
    data,
    refetch: fetchData,
    isLoading,
  }
}

// export const useTaskGroups = (boardId) => {
//   const [taskGroups, setTaskGroups] = React.useState([])

//   React.useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const tmpdata = await getTaskGroups(boardId)
//         setTaskGroups(tmpdata)
//       }
//       fetchData()
//     } catch (e) {
//       // do nothing
//     }
//   }, [boardId])

//   return {
//     taskGroups,
//   }
// }
