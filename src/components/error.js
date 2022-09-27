import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'

export const Error = ({ status, info }) => {
  return (
    <Alert status='error' align='center' justifyContent='center'>
      <AlertIcon />
      <AlertTitle mr={2}>{`status code: ${status}`}</AlertTitle>
      <AlertDescription>{info}</AlertDescription>
    </Alert>
  )
}
