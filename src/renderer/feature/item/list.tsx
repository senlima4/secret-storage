import * as React from 'react'
import { FiInbox } from 'react-icons/fi'
import { Icon, Text, VStack } from '@chakra-ui/react'

import useStore from '@/renderer/store'

import ItemCard from './card'

const ItemList: React.FC = () => {
  const items = useStore(state => state.items)
  const allItem = useStore(state => state.allItem)

  React.useEffect(() => {
    allItem()
  }, [])

  return (
    <VStack w="full" spacing={0}>
      {items.length === 0 && (
        <>
          <Icon as={FiInbox} fontSize="2xl" color="gray.500" />
          <Text color="gray.500">No items</Text>
        </>
      )}

      {items.length > 0 && (
        <>
          {items.map(item => (
            <ItemCard key={item.id} data={item} />
          ))}
        </>
      )}
    </VStack>
  )
}

export default React.memo(ItemList)
