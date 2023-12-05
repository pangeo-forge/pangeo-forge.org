import {
    Box,
    Container,
    Link,
    ListIcon,
    ListItem,
    Text,
    UnorderedList,
  } from '@chakra-ui/react'
  import { ExternalLinkIcon } from '@chakra-ui/icons'
  import React from 'react'
  
  export const Catalogs = () => {
    return (
      <Box>
        {' '}
        <Container maxW='container.xl' py={90}>
            <Text
            //   textTransform={'uppercase'}
            //   color={'white'}
            //   opacity={0.8}
              align={'left'}
            >
                {' '}
                Catalogs
            </Text>
            <UnorderedList
            
            >
                <ListItem>
                    <Link
                        href='https://leap-data-catalog.vercel.app'
                        isExternal
                    >
                    LEAP Data Catalog <ExternalLinkIcon mx='2px' />
                    </Link>
                </ListItem>
                <ListItem>
                    <Link
                        href='https://github.com/leap-stc/cmip6-leap-feedstock#how-to-access-the-newly-uploaded-data'
                        isExternal
                    >
                    LEAP CMIP6 Catalog <ExternalLinkIcon mx='2px' />
                    </Link>
                </ListItem>
            </UnorderedList>
        </Container>
      </Box>
    )
  }
  