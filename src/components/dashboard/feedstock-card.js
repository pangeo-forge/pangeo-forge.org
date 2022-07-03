import { Link } from '@/components'
import { useRepo } from '@/lib/endpoints'
import { TimeDeltaFormatter } from '@/lib/time-delta'
import { getProductionRunInfo } from '@/lib/recipe-run-utils'
import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { GoMarkGithub } from 'react-icons/go'

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
        boxShadow: 'md',
      }}
    >
      <Stack spacing={2} direction='column'>
        <LinkOverlay
          href={href}
          as={Link}
          _hover={{
            textDecoration: 'none',
          }}
          justify={'left'}
        >
          <Stack spacing={2}>
            <Heading as={'h3'} size='xs' textTransform='uppercase'>
              {spec

                .toLowerCase()
                .replace('pangeo-forge/', '')
                .replace('-feedstock', '')}
            </Heading>
            <Box py={4}>
              <Text opacity={0.8} noOfLines={2}>
                {repo.commit.message}
              </Text>
            </Box>

            <Stack justify={'left'} direction='row' spacing={2}>
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
              <GoMarkGithub size={20} />
            </Stack>
          </Stack>
        </LinkOverlay>
      </Stack>
    </LinkBox>
  )
}
