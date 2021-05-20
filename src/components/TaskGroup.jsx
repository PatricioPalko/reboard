import * as React from 'react'
import { Flex, Heading, Button, Text } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { getTaskGroups } from '../utils/api'

// eslint-disable-next-line react/prop-types
export const TaskGroup = ({ boardId }) => {
  // const [status, setStatus] = React.useState('loading')
  const [groups, setGroup] = React.useState([])

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getTaskGroups(boardId)
        setGroup(data)
      }
      fetchData()
    } catch (e) {
      // donothing
    }
  }, [boardId])
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      {groups.map((group) => (
        <Flex direction="column" background="green.100" p={12} rounded={6} mr={2} ml={2}>
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
          <Flex direction="column" bg="gray.200" p={9} mb={2}>
            <Text>Future task component</Text>
          </Flex>
          <Button colorScheme="green">
            <AddIcon w={3} h={3} mr={2} /> Add another task comp
          </Button>
        </Flex>
      ))}

      <Flex direction="column" background="green.100" p={6} rounded={6}>
        <Button colorScheme="green">
          <AddIcon w={3} h={3} mr={2} />
          Add another lists
        </Button>
      </Flex>
    </Flex>
  )
}
