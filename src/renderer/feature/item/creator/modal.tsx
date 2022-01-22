import * as React from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { FiPlus } from 'react-icons/fi'

import type { EditableItemVariables } from '@/typings'

import useStore from '@/renderer/store'

import ItemCreatorForm from './form'

export const CreateItemModal: React.FC = () => {
  const allItem = useStore(state => state.allItem)
  const createItem = useStore(state => state.createItem)

  const { isOpen, onOpen, onClose } = useDisclosure()

  useHotkeys('esc', onClose)

  useHotkeys('ctrl+shift+c', onOpen)

  const handleCreate = React.useCallback(
    async (data: EditableItemVariables) => {
      await createItem(data)
      await allItem()
      onClose()
    },
    [createItem, allItem, onClose]
  )

  return (
    <>
      <Button size="sm" leftIcon={<FiPlus />} onClick={onOpen}>
        Add Item
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={2}>
            <ItemCreatorForm onSubmit={handleCreate} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
