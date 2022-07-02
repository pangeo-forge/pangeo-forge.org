import { Link } from '@/components'
import { DatasetsAccordion } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstock } from '@/lib/endpoints'
import { getProductionRunInfo } from '@/lib/recipe-run-utils'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const Dataset = () => {
  const router = useRouter()

  const { id } = router.query
  const { fs: { spec = '', recipe_runs = [] } = {}, fsError } = useFeedstock(id)
  if (fsError)
    return (
      <Layout>
        <Box>Failed to load...</Box>
      </Layout>
    )

  if (!spec)
    return (
      <Layout>
        <Skeleton minH={'100vh'}></Skeleton>
      </Layout>
    )

  const { isProduction, datasets } = getProductionRunInfo(id, recipe_runs)

  const urls = {
    Bakery: `/dashboard/feedstock/${id}`,
    Feedstock: `/dashboard/feedstock/${id}`,
  }

  const myBinderLink =
    'https://mybinder.org/v2/gh/pangeo-forge/sandbox/binder?urlpath=git-pull%3Frepo%3Dhttps%253A%252F%252Fgithub.com%252Fpangeo-forge%252Fsandbox%26urlpath%3Dlab%252Ftree%252Fsandbox%252Fscratch.ipynb%26branch%3Dmain'
  return (
    <Layout>
      <Box as='section'>
        <Container maxW='container.xl' mt={90}>
          <Stack
            direction={{
              base: 'column',
              sm: 'column',
              md: 'row',
              lg: 'row',
              xl: 'row',
            }}
            spacing={{ base: 4, sm: 12 }}
            justify={'space-between'}
            align={'left'}
          >
            <Heading as={'h3'} size='lg'>
              {`Datasets for ${spec.replace('pangeo-forge/', '')}`}
            </Heading>

            <Stack
              spacing={4}
              direction={{
                base: 'column',
                sm: 'row',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
            >
              {Object.entries(urls).map(([name, url]) => (
                <Button
                  key={name}
                  as={Link}
                  href={url}
                  p={2}
                  colorScheme='teal'
                  variant='outline'
                >
                  {name}
                </Button>
              ))}
            </Stack>
          </Stack>

          <Box my={4}>
            <Alert status='info'>
              <AlertIcon />
              <Text>
                Each dataset can be accessed by running the Python code
                available under the dataset&apos;s respective section below.
                This code can be run on{' '}
                <Link href={myBinderLink} color={'blue.400'}>
                  MyBinder
                </Link>
                .
              </Text>
            </Alert>
          </Box>

          <Stack my={8}>
            {isProduction && <DatasetsAccordion datasets={datasets} />}
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export default Dataset
