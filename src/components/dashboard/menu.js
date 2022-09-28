import { Link } from '@/components'
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

export const Menu = () => {
  const router = useRouter()
  const tabs = {
    '/dashboard/feedstocks': {
      index: 0,
      label: 'Feedstocks',
    },
    '/dashboard/bakeries': {
      index: 1,
      label: 'Bakeries',
    },
    '/dashboard/recipe-runs': {
      index: 2,
      label: 'Recipe Runs',
    },
  }
  const [activeTab, setActiveTab] = React.useState(tabs[router.route].index)
  const onChange = (index) => setActiveTab(index)

  const selectedColor = { color: 'white', bg: 'teal.500' }

  return (
    <Box as='section' mt={50}>
      <Container maxW='container.xl' py={8} centerContent>
        {' '}
        <Tabs
          isLazy
          isFitted
          colorScheme='teal'
          onChange={onChange}
          index={activeTab}
          defaultIndex={activeTab}
          variant={'enclosed'}
        >
          <TabList>
            {Object.keys(tabs).map((key) => (
              <Link key={key} href={key}>
                <Tab _selected={selectedColor}>{tabs[key].label}</Tab>
              </Link>
            ))}
          </TabList>
          <TabPanels>
            {Object.keys(tabs).map((key) => (
              <TabPanel key={key}></TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  )
}
