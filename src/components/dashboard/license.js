import { Link } from '@/components'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { VscLaw } from 'react-icons/vsc'

export const License = ({ name, link }) => {
  const href =
    name === 'proprietary' ? link?.url : `https://spdx.org/licenses/${name}`

  const text = name === 'proprietary' ? link?.title : name

  return (
    <Flex>
      <Icon as={VscLaw} fontSize={'2xl'} />
      <Text as={Link} href={href} useExternalIcon px={2}>
        {text}
      </Text>
    </Flex>
  )
}
