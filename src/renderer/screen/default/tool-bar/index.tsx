import { Box } from '@chakra-ui/react'

import { CreateItemModal } from '@/renderer/feature/item/creator/modal'

export default function Toolbar() {
  return (
    <Box
      w="full"
      position="sticky"
      top={0}
      backdropBlur="md"
      bg="gray.50"
      p={4}
    >
      <CreateItemModal />
    </Box>
  )
}
