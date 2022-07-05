import { Box, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'

export const FeedstockInfo = ({ details }) => {
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
      </SimpleGrid>
    </>
  )
}
