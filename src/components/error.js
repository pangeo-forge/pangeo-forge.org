import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'

export const Error = ({ status, info, message }) => {
  return (
    <Alert
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
    >
      <AlertIcon />
      <AlertTitle my={2} fontSize='lg'>{`status code: ${status}`}</AlertTitle>
      <AlertDescription maxWidth='sm' my={2}>
        {message}
      </AlertDescription>
      <AlertDescription maxWidth='sm' my={2}>
        {JSON.stringify(info)}
      </AlertDescription>
    </Alert>
  )
}
