import React from 'react'
import {  Alert, AlertDescription, AlertIcon } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const OrchestratorAlert = React.forwardRef(function CustomLink(props, ref) {
  const { query } = useRouter()
  if ('orchestratorEndpoint' in query) {
    return (
      <Alert status='warning' variant='solid'>
        <AlertIcon />
        <AlertDescription>
          You are viewing a development version of this site, with data populated from
          https://{query.orchestratorEndpoint}. For latest version of the production site,
          navigate to <a href='https://pangeo-forge.org/'>https://pangeo-forge.org/</a>.
        </AlertDescription>
      </Alert>
    )
  }
  return null
})
