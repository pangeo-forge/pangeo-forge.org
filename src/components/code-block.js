import { CopyButton } from '@/components/copy-button'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark as style } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const CodeBlock = ({ className, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')

  return (
    <Box position='relative' zIndex='0'>
      <Box p={1} rounded={'sm'} my={2}>
        <Box py={-1}>
          {' '}
          <SyntaxHighlighter
            language={props.language ? props.language : match ? match[1] : null}
            style={style}
            {...props}
          />
        </Box>

        <CopyButton top={4} text={props.children} />
      </Box>
    </Box>
  )
}
