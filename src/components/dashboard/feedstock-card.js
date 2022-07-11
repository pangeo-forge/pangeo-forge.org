import { Link } from '@/components'
import { MaintainersGroup } from '@/components/dashboard'
import { useMeta, useRepo } from '@/lib/endpoints'
import { TimeDeltaFormatter } from '@/lib/time-delta'
import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { GoMarkGithub } from 'react-icons/go'

export const FeedstockCard = ({ spec, id }) => {
  const href = `/dashboard/feedstock/${id}`

  const { repo, repoError } = useRepo(
    `https://api.github.com/repos/${spec}/commits/HEAD`
  )

  const { meta, metaError } = useMeta(spec)

  if (repoError) return <Box>{'error'}</Box>
  if (!repo) return <Skeleton minH={'100vh'}></Skeleton>

  console.log(meta.title, spec)

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
              {'title' in meta
                ? meta.title
                : spec
                    .toLowerCase()
                    .replace('pangeo-forge/', '')
                    .replace('-feedstock', '')}
            </Heading>
            <Box py={4}>
              <Text opacity={0.8} noOfLines={2}>
                {meta.description
                  ? meta.description
                  : spec.includes('staged-recipes')
                  ? 'A place to submit pangeo-forge recipes before they become fully fledged pangeo-forge feedstocks'
                  : repo.commit.message}
              </Text>
            </Box>

            <Stack
              direction={{
                base: 'column',
                sm: 'row',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              spacing={{ base: 4, sm: 12 }}
              justify={'space-between'}
              align={'center'}
            >
              <MaintainersGroup maintainers={meta.maintainers} />

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
          </Stack>
        </LinkOverlay>
      </Stack>
    </LinkBox>
  )
}
