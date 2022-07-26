import { Link } from '@/components'
import { useStats } from '@/lib/endpoints'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

const Stat = (props) => {
  const { label, value, ...boxProps } = props
  return (
    <Box
      px={{ base: '4', md: '6' }}
      py={{ base: '5', md: '6' }}
      bg='bg-surface'
      borderRadius='lg'
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      {...boxProps}
    >
      {' '}
      <Stack>
        <Text fontSize='sm'>{label}</Text>
        <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>
          {value}
        </Heading>
      </Stack>
    </Box>
  )
}

export const Summary = () => {
  const borderColor = useColorModeValue('gray.800', 'gray.500')
  const feedstocks = useStats('feedstocks')
  const recipeRuns = useStats('recipe_runs')
  const datasets = useStats('datasets?exclude_test_runs=true')

  const reports = [
    { label: 'Feedstocks', href: '/dashboard/feedstocks', stats: feedstocks },
    { label: 'Recipe Runs', href: '/dashboard/recipe-runs', stats: recipeRuns },
    { label: 'Datasets', href: '/catalog', stats: datasets },
  ]
  return (
    <Box as='section' py={{ base: '4', md: '8' }}>
      <Container maxW='container.xl'>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
          {reports.map(({ label, href, stats }) => (
            <Stat
              pt={[1]}
              pb={[2]}
              textAlign={'center'}
              as={Link}
              transitionProperty='all'
              transitionDuration='slower'
              transitionTimingFunction='ease-out'
              bg='gray.50'
              _dark={{ bg: 'gray.700' }}
              _hover={{
                transform: 'scale(1.025)',
                boxShadow: 'md',
                textDecoration: 'none',
              }}
              href={href}
              shadow={'xl'}
              border={'1px solid'}
              borderColor={borderColor}
              rounded={'lg'}
              key={label}
              label={label}
              value={stats.stat ? stats.stat.count : '-'}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
