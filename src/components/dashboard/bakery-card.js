import {
  Badge,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VStack,
  WrapItem,
} from '@chakra-ui/react'
import { BsGlobe2 } from 'react-icons/bs'
import React from 'react'
import { Link } from '@/components'

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
        <LinkOverlay
          href={href}
          as={Link}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <VStack spacing={2} align='stretch'>
            <Heading as={'h3'} size='sm' textTransform='uppercase'>
              {name}
            </Heading>
            <Text lineHeight='tall' opacity={0.8}>
              {description}
            </Text>
            <Stack py={4} justify={'right'} direction='row' spacing={4}>
              <WrapItem overflow='hidden'>
                <Badge
                  as='a'
                  rel='tag'
                  color='teal.600'
                  _dark={{ color: 'teal.400' }}
                  textTransform='uppercase'
                  fontSize='xs'
                  fontWeight='bold'
                  whiteSpace='break-spaces'
                  variant='outline'
                >
                  {region}
                </Badge>
              </WrapItem>
              <BsGlobe2 size={20} />
            </Stack>
          </VStack>
        </LinkOverlay>
      </VStack>
    </LinkBox>
  )
}
