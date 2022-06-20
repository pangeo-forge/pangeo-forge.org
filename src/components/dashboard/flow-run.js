import { LogLine } from '@/components/dashboard'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

export const FlowRun = ({ index, run }) => {
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
                <MinusIcon fontSize='12px' />
              ) : (
                <AddIcon fontSize='12px' />
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
