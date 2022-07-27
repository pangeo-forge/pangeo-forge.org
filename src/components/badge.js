import { Badge as ChakraBadge } from '@chakra-ui/react'

export const Badge = ({ text, ...props }) => {
  return (
    <ChakraBadge variant='outline' fontWeight='bold' {...props}>
      {text}
    </ChakraBadge>
  )
}
