import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const Link = React.forwardRef(function CustomLink(props, ref) {
  let href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  const { useExternalIcon, ...rest } = props
  const { query } = useRouter()

  if (isInternalLink) {
    let paramsToAppend = ''
    if ('orchestratorEndpoint' in query) {
      paramsToAppend = `orchestratorEndpoint=${query.orchestratorEndpoint}`
    }

    // Check if query parameters are empty
    if (
      query &&
      Object.keys(query).length === 0 &&
      Object.getPrototypeOf(query) === Object.prototype
    ) {
      href = `${href}?${paramsToAppend}`
    } else {
      href = `${href}&${paramsToAppend}`
    }

    return (
      <NextLink href={href} passHref>
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
