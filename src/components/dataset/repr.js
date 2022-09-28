import { CodeBlock, Error } from '@/components'
import { useXarrayDatasetRepr } from '@/lib/endpoints'
import { Box, Spinner } from '@chakra-ui/react'

export const DatasetRepr = ({ dataset, includeSnippet = true }) => {
  const code = `import xarray as xr

store = '${dataset}'
ds = xr.open_dataset(store, engine='zarr', chunks={})
ds`
  const { repr, reprError, isLoading } = useXarrayDatasetRepr(dataset)

  if (reprError)
    return (
      <Error
        status={reprError?.status}
        info={reprError?.info}
        message={reprError?.message}
      />
    )

  return (
    <>
      {includeSnippet && (
        <CodeBlock showLineNumbers language={'python'}>
          {code}
        </CodeBlock>
      )}

      <Box my={4}>
        {isLoading && (
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='teal.500'
            size='xl'
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: repr }} />
      </Box>
    </>
  )
}
