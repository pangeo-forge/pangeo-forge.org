import { CodeBlock, Error } from '@/components'
import { useXarrayDatasetRepr } from '@/lib/endpoints'
import { Box, Skeleton } from '@chakra-ui/react'

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
      <Skeleton isLoaded={!isLoading}>
        <Box my={4}>
          <div dangerouslySetInnerHTML={{ __html: repr }} />
        </Box>
      </Skeleton>
    </>
  )
}
