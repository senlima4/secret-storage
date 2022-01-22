import * as React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { Box, VStack, Button, Text, Icon } from '@chakra-ui/react'

import { EditableItemVariables } from '@/typings'

import useStore from '@/renderer/store'

import ItemEditForm from './form'
import ItemDisplayer from './displayer'

type EditorMode = 'edit' | 'display'

const ItemEditor: React.FC = () => {
  const [mode, setMode] = React.useState<EditorMode>('display')
  const focusId = useStore(state => state.focusId)
  const items = useStore(state => state.items)
  const allItem = useStore(state => state.allItem)
  const updateItem = useStore(state => state.updateItem)

  const focusItem = React.useMemo(
    () => items.find(item => item.id === focusId),
    [items, focusId]
  )

  const toggleMode = React.useCallback(() => {
    setMode(prevMode => (prevMode === 'edit' ? 'display' : 'edit'))
  }, [])

  const handleEdit = React.useCallback(
    async (data: EditableItemVariables) => {
      if (!focusId) return
      await updateItem(focusId, data)
      await allItem()
    },
    [focusId]
  )

  if (!focusItem) {
    return (
      <VStack w="full" h="100%" spacing={2}>
        <Icon icon={<FiAlertCircle />} />
        <Text>No item select</Text>
      </VStack>
    )
  }

  return (
    <Box w="full">
      <Box p={4}>
        <Button size="sm" type="button" onClick={toggleMode}>
          Toggle display/edit
        </Button>
      </Box>
      <Box px={4} w="full" pos="relative">
        {mode === 'edit' ? (
          <ItemEditForm
            data={focusItem}
            onSubmit={handleEdit}
            onCancel={toggleMode}
          />
        ) : (
          <ItemDisplayer data={focusItem} />
        )}
      </Box>
    </Box>
  )
}

export default React.memo(ItemEditor)
