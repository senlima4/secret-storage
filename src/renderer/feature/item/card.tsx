import * as React from 'react'
import { Box, Text } from '@chakra-ui/react'

import { ParsedItem } from '@/typings'
import useStore from '@/renderer/store'

interface ItemCardPropTypes {
  data: ParsedItem
}

const ItemCard: React.FC<ItemCardPropTypes> = ({ data }) => {
  const focusId = useStore(state => state.focusId)
  const setFocusId = useStore(state => state.setFocusId)

  const handleClick = React.useCallback(() => {
    setFocusId(data.id)
  }, [data.id])

  return (
    <Box
      w="full"
      p={2}
      pos="relative"
      borderBottom="1px"
      borderColor="gray.200"
      bg={focusId === data.id ? 'blue.500' : 'white'}
      color={focusId === data.id ? 'white' : 'black'}
      onClick={handleClick}
    >
      <Text fontWeight="bold" fontSize="sm">
        {data.title}
      </Text>
      <Text fontSize="xs">{data.about || ''}</Text>
    </Box>
  )
}

export default React.memo(ItemCard)
