import { CodeBlock, Error } from '@/components'
import { useXarrayDatasetRepr } from '@/lib/endpoints'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Skeleton,
} from '@chakra-ui/react'

const DatasetRepr = ({ dataset }) => {
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
    <Skeleton isLoaded={!isLoading}>
      <Box my={4}>
        <div dangerouslySetInnerHTML={{ __html: repr }} />
      </Box>
    </Skeleton>
  )
}

export const DatasetCard = ({ dataset }) => {
  const name = dataset
    .split('/')
    .filter((elem) => elem)
    .slice(-1)
  const code = `import xarray as xr

store = '${dataset}'
ds = xr.open_dataset(store, engine='zarr', chunks={})
ds`
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              {name}
            </Box>

            {isExpanded ? (
              <MinusIcon fontSize='xl' />
            ) : (
              <AddIcon fontSize='xl' />
            )}
          </AccordionButton>

          <AccordionPanel pb={4}>
            <CodeBlock showLineNumbers language={'python'}>
              {code}
            </CodeBlock>
            <DatasetRepr dataset={dataset} />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

export const DatasetsAccordion = ({ datasets }) => {
  return (
    <Accordion allowMultiple>
      {datasets.map((dataset, index) => {
        return <DatasetCard key={index} dataset={dataset} />
      })}
    </Accordion>
  )
}
