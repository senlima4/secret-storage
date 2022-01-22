import { VStack, Heading } from '@chakra-ui/react'

import useStore from '@/renderer/store'
import caller from '@/renderer/ipc-caller'

import {
  InitialForm,
  InitialFormData,
} from '@/renderer/feature/account/initial-form'

export default function InitScreen() {
  const checkMode = useStore(state => state.checkMode)

  const onSubmit = async (data: InitialFormData) => {
    console.log('asdfashjdgbf')
    await caller.initPassword(data.password)
    await checkMode()
  }

  return (
    <VStack
      w="95%"
      maxW="375px"
      h="100vh"
      pt="30vh"
      mx="auto"
      position="relative"
    >
      <Heading mb={6} alignSelf="flex-start">
        Init entry password
      </Heading>
      <InitialForm onSubmit={onSubmit} />
    </VStack>
  )
}
