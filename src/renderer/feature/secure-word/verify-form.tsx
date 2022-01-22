import * as React from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import {
  Input,
  Button,
  VStack,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'

export interface SecureWordVerifyFormData {
  secureWord: string
}

const defaultValues: SecureWordVerifyFormData = {
  secureWord: '',
}

interface PropTypes {
  onSubmit: (data: SecureWordVerifyFormData) => void
}

export const SecureWordVerifyForm: React.FC<PropTypes> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SecureWordVerifyFormData>({
    defaultValues,
  })

  return (
    <VStack w="full" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.secureWord)}>
        <FormLabel htmlFor="secureWord">Secure word</FormLabel>
        <Input {...register('secureWord')} />
        <ErrorMessage
          errors={errors}
          name="secureWord-error"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>

      <Button type="submit">Verify</Button>
    </VStack>
  )
}
