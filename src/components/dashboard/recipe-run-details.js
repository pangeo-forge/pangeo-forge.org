import { Link } from '@/components'
import { StatusBadge } from '@/components/dashboard'
import { Badge, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { formatDistance } from 'date-fns'

export const RecipeRunDetails = ({
  id,
  name,
  started_at,
  completed_at,
  spec,
  version,
  head_sha,
  status,
  conclusion,
}) => {
  const details = {
    Status: <StatusBadge status={status} conclusion={conclusion} />,
    ID: id,
    Name: name,
    'Started at': started_at ? started_at : '-',
    'Finished at': completed_at ? completed_at : '-',
    Duration: completed_at
      ? formatDistance(new Date(completed_at), new Date(started_at))
      : '-',

    Version: (
      <Badge variant='outline' colorScheme='gray' fontWeight='bold'>
        {version}
      </Badge>
    ),
    'Git SHA': (
      <Badge
        as={Link}
        href={`https://github.com/${spec}/tree/${head_sha}`}
        variant='outline'
        colorScheme='gray'
        fontWeight='bold'
        useExternalIcon
      >
        {head_sha?.slice(0, 7)}
      </Badge>
    ),
  }

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 2, sm: 6 }}
        my={8}
      >
        {Object.keys(details).map((key, index) => (
          <HStack key={index} align={'top'} my={2}>
            {' '}
            <VStack align={'start'}>
              <Text color={'gray.600'}>{key}</Text>
              <Text fontWeight={600} maxW={'90vw'}>
                {details[key]}
              </Text>
            </VStack>
          </HStack>
        ))}
      </SimpleGrid>
    </>
  )
}
