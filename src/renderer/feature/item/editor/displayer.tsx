import * as React from 'react'
import {
  Box,
  Flex,
  FormLabel,
  FormControl,
  Input,
  Text,
} from '@chakra-ui/react'

import { ParsedItem } from '@/typings'

interface PropTypes {
  data: ParsedItem
}

const ItemDisplayer: React.FC<PropTypes> = ({ data }) => {
  return (
    <Flex w="full" flexDir="column">
      <Text mb={1} fontSize="lg" fontWeight="bold">
        {data.title}
      </Text>

      <Text mb={6}>{data.about || ''}</Text>

      <Box>
        {data.value.map(field => (
          <FormControl key={field.name} w="full" mb={2}>
            <FormLabel>{field.name}</FormLabel>
            <Input size="sm" defaultValue={field.value} readOnly />
          </FormControl>
        ))}
      </Box>
    </Flex>
  )
}

export default React.memo(ItemDisplayer)
