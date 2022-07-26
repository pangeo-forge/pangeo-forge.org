import { Link } from '@/components'
import { Vercel } from '@/components/vercel'
import {
  Box,
  ButtonGroup,
  Container,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaDiscourse, FaGithub, FaTwitter } from 'react-icons/fa'

export const Footer = () => {
  const color = useColorModeValue('white', 'purple.100')
  return (
    <Box
      css={{
        backgroundColor: useColorModeValue(
          'rgba(50, 33, 115, 0.9)',
          'rgba(26, 32, 44, 0.8)'
        ),
      }}
      color={color}
      mt={12}
    >
      <Container
        maxW='container.xl'
        as='footer'
        role='contentinfo'
        py={{ base: '3', md: '4' }}
      >
        <Stack spacing={{ base: '4', md: '5' }}>
          <Stack justify='space-between' direction='row' align='center'>
            <Stack
              as={Link}
              href={'/'}
              direction={'row'}
              alignItems={'center'}
              spacing={{ base: 2, sm: 4 }}
            >
              <Image
                w={225}
                src={'/pangeo-forge-text-only-white.png'}
                alt={'Pangeo-Forge logo'}
              />
            </Stack>

            <ButtonGroup variant='outline'>
              <IconButton
                as={Link}
                _hover={{
                  textDecoration: 'none',
                }}
                href='https://discourse.pangeo.io/'
                aria-label='Discourse'
                icon={<FaDiscourse />}
                fontSize={'3xl'}
              />
              <IconButton
                _hover={{
                  textDecoration: 'none',
                }}
                as={Link}
                href='https://github.com/pangeo-forge'
                aria-label='GitHub'
                icon={<FaGithub />}
                fontSize={'3xl'}
              />
              <IconButton
                _hover={{
                  textDecoration: 'none',
                }}
                as={Link}
                href='https://twitter.com/pangeo_data'
                aria-label='Twitter'
                icon={<FaTwitter />}
                fontSize={'3xl'}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize='sm' color={'white'}>
            &copy; {new Date().getFullYear()} The Pangeo Community. Apache 2.0
            Licensed.
          </Text>
        </Stack>

        <Container py={4} centerContent>
          {' '}
          <Vercel />
        </Container>
      </Container>
    </Box>
  )
}
