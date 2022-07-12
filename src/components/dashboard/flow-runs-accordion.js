import { LogLine } from '@/components/dashboard'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Accordion,
  Box,
} from '@chakra-ui/react'
import React from 'react'

const FlowRun = ({ index, run }) => {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Flow Run {index}
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize='xl' />
              ) : (
                <AddIcon fontSize='xl' />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {run.logs?.map((log, index) => (
              <Box key={index}>
                <LogLine
                  timestamp={log.timestamp}
                  level={log.level}
                  message={log.message}
                ></LogLine>
              </Box>
            ))}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

export const FlowRunsAccordion = ({ runs }) => {
  return (
    <Accordion allowMultiple>
      {runs.map((run, index) => {
        return <FlowRun key={index} index={index} run={run} />
      })}
    </Accordion>
  )
}
