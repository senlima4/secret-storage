import * as React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message'
import {
  Input,
  Button,
  VStack,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import * as yup from 'yup'

export interface InitialFormData {
  password: string
  confirmPassword: string
}

const defaultValues: InitialFormData = {
  password: '',
  confirmPassword: '',
}

interface PropTypes {
  onSubmit: (data: InitialFormData) => void
}

const validationSchema = yup
  .object()
  .shape({
    password: yup.string().required('Field is required'),
    confirmPassword: yup
      .string()
      .required('Field is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required()

export const InitialForm: React.FC<PropTypes> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<InitialFormData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  return (
    <VStack as="form" w="full" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.password?.message)}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          placeholder="At least 1 word. Your free"
          {...register('password')}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>

      <FormControl isInvalid={Boolean(errors.confirmPassword)}>
        <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
        <Input type="password" {...register('confirmPassword')} />
        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>

      <Button type="submit" alignSelf="flex-end" isLoading={isSubmitting}>
        Submit
      </Button>
    </VStack>
  )
}
