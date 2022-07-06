import { Link } from '@/components'
import { List, ListIcon, ListItem, VStack } from '@chakra-ui/react'
import { BsBuilding } from 'react-icons/bs'

export const Providers = ({ providers }) => {
  if (!providers) return null

  return (
    <List as={VStack} spacing={2} align='left'>
      {providers.map((provider, index) => (
        <ListItem as={Link} key={index} href={provider.url} useExternalIcon>
          <ListIcon as={BsBuilding} color='green.500' />
          {provider.name}
        </ListItem>
      ))}
    </List>
  )
}
