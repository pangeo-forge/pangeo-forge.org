import { Link } from '@/components'
import { Box, Button, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { GoDatabase, GoRepo, GoTag } from 'react-icons/go'

export const FeedstockInfo = ({
  details,
  isProduction,
  datasetsUrl,
  datasets,
}) => {
  return (
    <>
      {' '}
      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 2 }}
        spacing={4}
        my={8}
        justifyContent={'space-between'}
      >
        {Object.keys(details).map((key, index) => (
          <HStack key={index} align={'top'}>
            {' '}
            <VStack align={'start'}>
              <Text color={'gray.600'}>{key}</Text>

              <Box fontWeight={600} maxW={'90vw'}>
                {details[key]}
              </Box>
            </VStack>
          </HStack>
        ))}
        {isProduction && (
          <VStack align={'start'}>
            <Button
              as={Link}
              href={datasetsUrl}
              colorScheme='teal'
              variant='outline'
              fontSize={'lg'}
            >
              {' '}
              <GoDatabase />
              <Text ml={2}>{`${datasets.length} dataset${
                datasets.length > 1 ? 's' : ''
              } for this feedstock`}</Text>
            </Button>
          </VStack>
        )}
      </SimpleGrid>
    </>
  )
}
