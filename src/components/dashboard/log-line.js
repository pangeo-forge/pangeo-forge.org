import { SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

export const LogLine = ({ timestamp, level, message }) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: '2', md: '4' }}
      fontFamily={'mono'}
      mt={8}
    >
      <Text>
        {' '}
        {timestamp} ({level})
      </Text>

      <Text>{message}</Text>
    </SimpleGrid>
  )
}
