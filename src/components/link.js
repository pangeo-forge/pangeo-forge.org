import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

export const Link = React.forwardRef(function CustomLink(props, ref) {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <ChakraLink ref={ref} {...props}>
          {props.children}
        </ChakraLink>
      </NextLink>
    )
  }

  return (
    <ChakraLink isExternal {...props} ref={ref}>
      {props.children}
      {props.useExternalIcon && <ExternalLinkIcon mx='2px' />}
    </ChakraLink>
  )
})
