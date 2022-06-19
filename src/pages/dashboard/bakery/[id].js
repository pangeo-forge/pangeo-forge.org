import { Link } from '@/components'
import { RecipeRunCard } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useBakery } from '@/lib/endpoints'
import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Bakery = () => {
  const router = useRouter()
  const { id } = router.query

  const { bakery, bakeryError } = useBakery(id)

  const repoUrl = 'https://github.com/pangeo-forge/pangeo-forge-gcs-bakery'

  if (!bakery)
    return (
      <Layout>
        <Spinner />
      </Layout>
    )

  if (bakeryError)
    return (
      <Layout>
        <Box>Failed to load...</Box>
      </Layout>
    )

  return (
    <Layout>
      <Flex>
        <Box sx={{ flex: '1 1 auto' }}>
          <Heading as={'h2'}>{bakery.name}</Heading>
        </Box>

        <Link href={repoUrl}>
          <Button
            sx={{
              float: 'right',
              ml: [1, null, 2],
              maxHeight: 36,
              mt: [3, null, 4],
              bg: 'white',
              color: 'purple',
              fontSize: [3],
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Git Repository
          </Button>
        </Link>
      </Flex>
      <Text>{bakery.description}</Text>

      <Heading as={'h2'}>Recipe Runs</Heading>
      <Box>
        {bakery.recipe_runs.reverse().map((recipe, index) => (
          <RecipeRunCard
            key={index}
            recipe_id={recipe.recipe_id}
            id={recipe.id}
            started_at={recipe.started_at}
            status={recipe.status}
            version={recipe.version}
            message={recipe.message}
          />
        ))}
      </Box>
    </Layout>
  )
}

export default Bakery
