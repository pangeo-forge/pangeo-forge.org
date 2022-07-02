import { CodeBlock } from '@/components'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import React from 'react'

export const DatasetCard = ({ dataset }) => {
  const parts = dataset.split('/')
  const name = parts[parts.length - 1]
  const code = `import xarray as xr

store = '${dataset}'
ds = xr.open_dataset(store, engine='zarr', chunks={})
print(ds)`
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
