import { DatasetRepr } from '@/components/dataset'
import { getDatasetName } from '@/lib/dataset-utils'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'

export const DatasetCard = ({ dataset }) => {
  const name = getDatasetName(dataset)

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
      {datasets?.map((dataset, index) => {
        return <DatasetCard key={index} dataset={dataset?.dataset_public_url} />
      })}
    </Accordion>
  )
}
