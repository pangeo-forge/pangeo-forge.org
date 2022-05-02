import React, { forwardRef } from 'react'
import { Link as ThemeUILink } from 'theme-ui'
import NextLink from 'next/link'

const Link = ({ href, children, ...props }, ref) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <ThemeUILink ref={ref} {...props}>
          {children}
        </ThemeUILink>
      </NextLink>
    )
  }

  return (
    /**
     * Anchor link to an external url,
     * adds the default `target="_blank" rel="noopener noreferrer"` props.
     */

    <ThemeUILink
      ref={ref}
      href={href}
      {...props}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </ThemeUILink>
  )
}

export default forwardRef(Link)
