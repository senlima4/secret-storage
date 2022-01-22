import * as React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { FiXCircle } from 'react-icons/fi'
import {
  Box,
  Flex,
  VStack,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Textarea,
  IconButton,
} from '@chakra-ui/react'

import { EditableItemVariables } from '@/typings'

const defaultValues: EditableItemVariables = {
  title: '',
  about: '',
  value: [{ name: '', value: '' }],
}

interface PropTypes {
  onSubmit: (data: EditableItemVariables) => void
}

const ItemCreatorForm: React.FC<PropTypes> = ({ onSubmit }) => {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<EditableItemVariables>({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'value',
  })

  const handleAddField = () => {
    append({ name: '', value: '' })
  }

  return (
    <VStack as="form" w="full" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.title)}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          size="sm"
          {...register('title', { required: 'Field is required' })}
        />
        <ErrorMessage
          errors={errors}
          name="title-error"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="about">About</FormLabel>
        <Textarea size="sm" {...register('about')} />
      </FormControl>

      <Box w="full" pb={6}>
        <Flex w="full" alignContent="center">
          <FormLabel flex={1} mr={2}>
            Name
          </FormLabel>
          <FormLabel flex={1}>Value</FormLabel>
        </Flex>
        {fields.map((field, index) => (
          <Flex key={field.id} mb={2} w="full" alignItems="center">
            <FormControl flex={1} mr={2}>
              <Input
                size="sm"
                {...register(`value.${index}.name`, {
                  required: 'Field is required',
                })}
              />
            </FormControl>

            <Flex flex={1} alignItems="center">
              <FormControl flex="auto">
                <Input
                  size="sm"
                  w="full"
                  {...register(`value.${index}.value`, {
                    required: 'Field is required',
                  })}
                />
              </FormControl>
              {index > 0 && (
                <IconButton
                  ml={1}
                  size="sm"
                  flex="none"
                  variant="outline"
                  icon={<FiXCircle />}
                  aria-label="delete"
                  onClick={() => {
                    remove(index)
                  }}
                />
              )}
            </Flex>
          </Flex>
        ))}
        <Button type="button" size="sm" onClick={handleAddField}>
          Add field
        </Button>
      </Box>

      <Button type="submit" w="full" isLoading={isSubmitting}>
        Submit
      </Button>
    </VStack>
  )
}

export default React.memo(ItemCreatorForm)
