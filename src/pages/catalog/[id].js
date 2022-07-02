import { Layout } from '@/components/layout'
import { useFeedstock } from '@/lib/endpoints'
import { getProductionRunInfo } from '@/lib/recipe-run-utils'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Link, Heading } from '@chakra-ui/react'

const Catalog = () => {
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

  const name = spec.replace('pangeo-forge/', '')
  return (
    <Layout>
      <Box>
        <Heading as={h1}>{name} Catalog</Heading>
        {isProduction && (
          <Box as='ol'>
            {datasets.map((dataset, index) => {
              return <li key={index}>{dataset}</li>
            })}
          </Box>
        )}
      </Box>
      <Box>
        <Button>
          <Link href={`/dashboard/feedstock/${id}`}>Feedstock URL </Link>
        </Button>
      </Box>
    </Layout>
  )
}

export default Catalog
