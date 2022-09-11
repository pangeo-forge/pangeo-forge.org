import { CodeBlock } from '@/components'
import { useXarrayDatasetRepr } from '@/lib/endpoints'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Skeleton,
} from '@chakra-ui/react'

export const DatasetCard = ({ dataset }) => {
  const parts = dataset.split('/')
  const name = parts[parts.length - 1]
  const { repr, reprError, isLoading } = useXarrayDatasetRepr(dataset)

  if (reprError)
    return (
      <Alert status='error' align='center' justifyContent='center'>
        <AlertIcon />
        {`Status Code: ${reprError.status}`} - {reprError.info?.detail}
      </Alert>
    )
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
            <Skeleton isLoaded={!isLoading}>
              <Box>
                <div dangerouslySetInnerHTML={{ __html: repr }} />
              </Box>
            </Skeleton>
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
