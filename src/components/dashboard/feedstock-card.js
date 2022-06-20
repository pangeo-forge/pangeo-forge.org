import { useRepo } from '@/lib/endpoints'
import { TimeDeltaFormatter } from '@/lib/time-delta'
import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VStack,
  Skeleton,
} from '@chakra-ui/react'
import React from 'react'
import { GoMarkGithub } from 'react-icons/go'
import { Link } from '@/components'

export const FeedstockCard = ({ spec, id }) => {
  const href = `/dashboard/feedstock/${id}`

  const { repo, repoError } = useRepo(spec)

  if (repoError) return <Box>{'error'}</Box>
  if (!repo) return <Skeleton minH={'100vh'}></Skeleton>

  return (
    <LinkBox
      p={4}
      rounded='lg'
      transitionProperty='all'
      transitionDuration='slower'
      transitionTimingFunction='ease-out'
      bg='gray.50'
      _dark={{ bg: 'gray.700' }}
      _hover={{
        transform: 'scale(1.025)',
        boxShadow: 'var(--chakra-shadows-md)',
      }}
    >
      <VStack spacing={2} align='stretch'>
        <LinkOverlay
          href={href}
          as={Link}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <VStack spacing={2} align='stretch'>
            <Heading as={'h3'} size='xs' textTransform='uppercase'>
              {spec
                .toLowerCase()
                .replace('pangeo-forge/', '')
                .replace('-feedstock', '')}
            </Heading>
            <Text lineHeight='tall' opacity={0.8}>
              {repo.commit.message}
            </Text>
            <Stack justify={'right'} direction='row' spacing={4}>
              <Text
                _dark={{ color: 'teal.400' }}
                fontSize='xs'
                fontWeight='bold'
                whiteSpace='break-spaces'
                variant='outline'
              >
                {TimeDeltaFormatter(
                  Date.now() - Date.parse(repo.commit.committer.date)
                )}{' '}
                via
              </Text>
              <GoMarkGithub />
            </Stack>
          </VStack>
        </LinkOverlay>
      </VStack>
    </LinkBox>
  )
}