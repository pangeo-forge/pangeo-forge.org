import { Button, useClipboard } from '@chakra-ui/react'
import React from 'react'

export const CopyButton = ({ text, ...props }) => {
  const { hasCopied, onCopy } = useClipboard(text)

  return (
    <Button
      size='sm'
      position='absolute'
      textTransform='uppercase'
      colorScheme='teal'
      fontSize='xs'
      height='24px'
      top={0}
      zIndex='1'
      right='1.25em'
      {...props}
      onClick={onCopy}
    >
      {hasCopied ? 'Copied' : 'Copy'}
    </Button>
  )
}
