import { Link } from '@/components'
import { StatusBadge } from '@/components/dashboard'
import { TimeDeltaFormatter } from '@/lib/time-delta'
import {
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaCircle } from 'react-icons/fa'
import { GiSandsOfTime } from 'react-icons/gi'
import { GoCalendar, GoNote, GoTag } from 'react-icons/go'

export const RecipeRunCard = ({
  id,
  recipe_id,
  started_at,
  message,
  status,
  version,
}) => {
  const statusIConColor = {
    queued: 'yellow.400',
    in_progress: 'orange.400',
    completed: 'green.400',
  }

  // TODO: have API return timestamps with UTC suffix
  // Here I'm mannually adding the +Z
  const timeSinceRun = TimeDeltaFormatter(
    Date.now() - Date.parse(started_at + 'Z')
  )

  const href = '/dashboard/recipe-run/' + id

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
      <LinkOverlay
        href={href}
        as={Link}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 2, xl: 2 }}
          spacing={4}
          justifyContent={'space-between'}
        >
          <Stack
            direction='column'
            align={'left'}
            justifyContent={'space-between'}
          >
            <HStack>
              <Icon
                as={FaCircle}
                fontSize={'2xl'}
                color={statusIConColor[status]}
              />

              <Text maxW={'80vw'}>{recipe_id}</Text>
            </HStack>
            {message && (
              <HStack>
                <Icon as={GoNote} fontSize={'2xl'} />
                <Text lineHeight='tall' opacity={0.8}>
                  {message}
                </Text>
              </HStack>
            )}
          </Stack>
          <Stack
            direction='column'
            align={'left'}
            justifyContent={'space-between'}
          >
            <HStack>
              <Icon as={GoCalendar} fontSize={'2xl'} />

              <Text>
                {started_at} ({timeSinceRun})
              </Text>
            </HStack>
            <HStack>
              <Icon as={GiSandsOfTime} fontSize={'2xl'} />
              <Text>
                {' '}
                <StatusBadge status={status} />
              </Text>
            </HStack>
            <HStack>
              <Icon as={GoTag} fontSize={'2xl'} />
              <Text>{version}</Text>
            </HStack>
          </Stack>
        </SimpleGrid>
      </LinkOverlay>
    </LinkBox>
  )
}
