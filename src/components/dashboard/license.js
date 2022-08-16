import { Link } from '@/components'
import { Text } from '@chakra-ui/react'

export const License = ({ name, link }) => {
  const href =
    name === 'proprietary' ? link?.url : `https://spdx.org/licenses/${name}`

  const text = name === 'proprietary' ? link?.title : name

  return (
    <>
      <Text as={Link} href={href} useExternalIcon>
        {text}
      </Text>
    </>
  )
}
