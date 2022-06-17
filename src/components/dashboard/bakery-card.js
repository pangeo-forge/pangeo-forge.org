import { Link } from '@/components'
import {
  Badge,
  Box,
  Center,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React from 'react'

export const BakeryCard = ({ name, region, description, id }) => {
  const href = `/dashboard/bakery/${id}`
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
        <Badge
          as='a'
          rel='tag'
          color='teal.600'
          _dark={{ color: 'teal.400' }}
          textTransform='uppercase'
          fontSize='xs'
          fontWeight='bold'
          whiteSpace='break-spaces'
        >
          {region}
        </Badge>
        <LinkOverlay href={href}>
          <VStack spacing={2} align='stretch'>
            <Heading as={'h3'} size='sm' textTransform='uppercase'>
              {name}
            </Heading>
            <Text lineHeight='tall' opacity={0.8}>
              {description}
            </Text>
          </VStack>
        </LinkOverlay>
      </VStack>
    </LinkBox>
  )
}
