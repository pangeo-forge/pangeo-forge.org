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
    if (query?.orchestratorEndpoint) {
      href = href.includes('?')
        ? `${href}&orchestratorEndpoint=${query.orchestratorEndpoint}`
        : `${href}?orchestratorEndpoint=${query.orchestratorEndpoint}`
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
