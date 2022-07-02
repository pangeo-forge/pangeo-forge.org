import { Link } from '@/components'
import { DatasetCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useFeedstock } from '@/lib/endpoints'
import { getProductionRunInfo } from '@/lib/recipe-run-utils'
import {
  Accordion,
  Box,
  Button,
  Container,
  Heading,
  Stack,
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

  const { isProduction, datasets } = getProductionRunInfo(id, recipe_runs)

  const urls = {
    Bakery: `/dashboard/feedstock/${id}`,
    Feedstock: `/dashboard/feedstock/${id}`,
  }
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

          <Stack mt={12} mb={8}>
            {isProduction && (
              <Accordion allowMultiple>
                {datasets.map((dataset, index) => {
                  return <DatasetCard key={index} dataset={dataset} />
                })}
              </Accordion>
            )}
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export default Dataset
