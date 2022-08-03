import { Link } from '@/components'
import { Maintainers, Providers } from '@/components/dashboard'
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { GoRepo, GoTag } from 'react-icons/go'
import { MdDynamicFeed } from 'react-icons/md'

export const FeedstockInfo = ({
  id,
  repo,
  name,
  title,
  description,
  pangeo_forge_version,
  pangeo_notebook_version,
  bakery,
  license,
  providers,
  maintainers,
}) => {
  const details = {
    Title: title,
    Description: description,
    'Pangeo-Forge Version': (
      <Flex>
        <Icon as={GoTag} fontSize={'2xl'} />
        <Text px={2}>{pangeo_forge_version}</Text>
      </Flex>
    ),
    'Pangeo Notebook Version': (
      <Flex>
        <Icon as={GoTag} fontSize={'2xl'} />
        <Text px={2}>{pangeo_notebook_version}</Text>
      </Flex>
    ),
    Bakery: bakery,
    License: license,
    Providers: <Providers providers={providers} />,
    Maintainers: <Maintainers maintainers={maintainers} />,
  }
  return (
    <>
      <Stack
        justify={'center'}
        spacing={{ base: '4', md: '8', lg: '12', xl: '16', '2xl': '24' }}
        direction={{
          base: 'column',
          sm: 'row',
          md: 'row',
          lg: 'row',
          xl: 'row',
        }}
      >
        <Button
          as={Link}
          href={`/dashboard/feedstock/${id}`}
          fontSize={'xl'}
          colorScheme='teal'
          variant='outline'
        >
          {' '}
          <MdDynamicFeed />
          <Text ml={2}>feedstock</Text>
        </Button>

        <Button
          as={Link}
          href={`https://github.com/${repo}`}
          fontSize={'xl'}
          colorScheme='teal'
          variant='outline'
          useExternalIcon
        >
          {' '}
          <GoRepo />
          <Text ml={2}>{name} repo</Text>
        </Button>
      </Stack>{' '}
      {repo == 'pangeo-forge/staged-recipes' && (
        <Text my={8}>
          A place to submit pangeo-forge recipes before they become fully
          fledged pangeo-forge feedstocks.
        </Text>
      )}
      {repo !== 'pangeo-forge/staged-recipes' && (
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

                <Box fontWeight={600} maxW={'90vw'}>
                  {details[key]}
                </Box>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      )}
    </>
  )
}
