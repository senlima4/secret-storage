import { Box, Flex } from '@chakra-ui/react'

import ItemList from '@/renderer/feature/item/list'
import ItemEditor from '@/renderer/feature/item/editor'

import Toolbar from './tool-bar'

function DefaultScreen() {
  return (
    <Flex w="full" pos="relative" h="100vh">
      <Box flex="none" w="250px" h="full" bg="gray.100">
        <Toolbar />
        <ItemList />
      </Box>
      <Box flex="auto" w="full">
        <ItemEditor />
      </Box>
    </Flex>
  )
}

export default DefaultScreen
