import React from 'react'
import { Badge } from '@chakra-ui/react'

export const StatusBadge = ({ status }) => {
  switch (status) {
    case 'queued':
      return (
        <Badge variant='outline' colorScheme='yellow' fontWeight='body'>
          queued
        </Badge>
      )
    case 'in_progress':
      return (
        <Badge variant='outline' colorScheme='orange' fontWeight='body'>
          in progress
        </Badge>
      )
    case 'completed':
      return (
        <Badge variant='outline' colorScheme='green' fontWeight='body'>
          completed
        </Badge>
      )
    default:
      return (
        <Badge variant='outline' colorScheme='gray' fontWeight='body'>
          {status ? status : 'unknown'}
        </Badge>
      )
  }
}
