import { Link } from '@/components'
import { DatasetsAccordion } from '@/components/dashboard'
import { Alert, AlertIcon, Box, Stack, Text } from '@chakra-ui/react'

export const FeedstockDatasets = ({ isProduction, datasets }) => {
  const myBinderLink =
    'https://mybinder.org/v2/gh/pangeo-forge/sandbox/binder?urlpath=git-pull%3Frepo%3Dhttps%253A%252F%252Fgithub.com%252Fpangeo-forge%252Fsandbox%26urlpath%3Dlab%252Ftree%252Fsandbox%252Fscratch.ipynb%26branch%3Dmain'
  return (
    <>
      {' '}
      <Stack
        direction={{
          base: 'column',
          sm: 'column',
          md: 'row',
          lg: 'row',
          xl: 'row',
        }}
        spacing={{ base: 4, sm: 12 }}
        justify={'space-between'}
        align={'left'}
      >
        {/* <Stack
              spacing={4}
              direction={{
                base: 'column',
                sm: 'row',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
            >
              {Object.entries(urls).map(([name, url]) => (
                <Button
                  key={name}
                  as={Link}
                  href={url}
                  p={2}
                  colorScheme='teal'
                  variant='outline'
                >
                  {name}
                </Button>
              ))}
            </Stack> */}
      </Stack>
      <Box my={4}>
        <Alert status='info'>
          <AlertIcon />
          <Text>
            Each dataset can be accessed by running the Python code available
            under the dataset&apos;s respective section below. This code can be
            run on{' '}
            <Link href={myBinderLink} color={'blue.400'}>
              MyBinder
            </Link>
            .
          </Text>
        </Alert>
      </Box>
      <Stack my={8}>
        {isProduction && <DatasetsAccordion datasets={datasets} />}
      </Stack>
    </>
  )
}
