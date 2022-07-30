import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

export const Link = React.forwardRef(function CustomLink(props, ref) {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  const { useExternalIcon, ...rest } = props

  if (isInternalLink) {
    const { query } = useRouter()
    let paramsToAppend = ''
    if ('orchestratorEndpoint' in query) {
      paramsToAppend = `?orchestratorEndpoint=${query.orchestratorEndpoint}`
    }
    return (
      <NextLink href={href + paramsToAppend} passHref>
        <ChakraLink ref={ref} {...rest}>
          {rest.children}
        </ChakraLink>
      </NextLink>
    )
  }

  return (
    <ChakraLink isExternal {...rest} ref={ref}>
      {rest.children}
      {useExternalIcon && <ExternalLinkIcon mx='2px' />}
    </ChakraLink>
  )
})
