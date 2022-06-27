import { Link } from '@/components'
import { StatusBadge } from '@/components/dashboard'
import { TimeDeltaFormatter } from '@/lib/time-delta'
import {
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  Stack,
  HStack,
  Box,
} from '@chakra-ui/react'
import { FaCircle } from 'react-icons/fa'
import { GiSandsOfTime } from 'react-icons/gi'
import { GoCalendar, GoTag } from 'react-icons/go'

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
              <Icon as={FaCircle} color={statusIConColor[status]} />
              <Box>
                <Text maxW={'80vw'}>{recipe_id}</Text>
              </Box>
            </HStack>
            <Text lineHeight='tall' opacity={0.8} px={6}>
              {message}
            </Text>
          </Stack>
          <Stack
            direction='column'
            align={'left'}
            justifyContent={'space-between'}
          >
            <Flex>
              <Icon as={GoCalendar} fontSize={'2xl'} />

              <Text ml={2}>
                {started_at} ({timeSinceRun})
              </Text>
            </Flex>
            <Flex>
              <Icon as={GiSandsOfTime} fontSize={'2xl'} />
              <Text ml={2}>
                {' '}
                <StatusBadge status={status} />
              </Text>
            </Flex>
            <Flex>
              <Icon as={GoTag} fontSize={'2xl'} />
              <Text ml={2}>{version}</Text>
            </Flex>
          </Stack>
        </SimpleGrid>
      </LinkOverlay>
    </LinkBox>
  )
}
