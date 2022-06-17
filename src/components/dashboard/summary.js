import { Link } from '@/components'
import { useStats } from '@/lib/endpoints'
import {
  Box,
  Container,
  Flex,
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
        <Text fontSize='sm' color='muted'>
          {label}
        </Text>
        <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>
          {value}
        </Heading>
      </Stack>
    </Box>
  )
}

export const Summary = () => {
  const feedstocks = useStats('feedstocks')
  const recipeRuns = useStats('recipe_runs')
  const datasets = useStats('datasets')

  const reports = [
    { label: 'Feedstocks', href: '/dashboard/feedstocks', stats: feedstocks },
    { label: 'Recipe Runs', href: '/dashboard/recipe-runs', stats: recipeRuns },
    { label: 'Datasets', href: '/dashboard/datasets', stats: datasets },
  ]
  return (
    <Box as='section' py={{ base: '4', md: '8' }}>
      <Container maxW='container.lg'>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
          {reports.map(({ label, href, stats }) => (
            <Stat
              pt={[1]}
              pb={[2]}
              textAlign={'center'}
              as={Link}
              href={href}
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
