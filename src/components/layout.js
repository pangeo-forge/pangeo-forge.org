import { Footer, Header, Meta } from '@/components'
import { Menu } from '@/components/dashboard'
import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'
export const Layout = ({
  children,
  menu = null,
  title = 'Pangeo-Forge',
  name = 'Pangeo-Forge',
  description = 'A cloud-native data repository for ocean, weather, and climate science.',
  image = 'pangeo-forge.org/pangeo-forge-logo-white.png', // social card image URL
  url = 'pangeo-forge.org',
}) => {
  return (
    <>
      <Meta
        title={title}
        name={name}
        description={description}
        image={image}
        url={url}
      />

      <Flex
        direction={'column'}
        justify={'space-between'}
        gap={0}
        minHeight={'100vh'}
      >
        <Box>
          <Header />
          {menu && <Menu />}
          {children}
        </Box>
        <Footer />
      </Flex>
    </>
  )
}
