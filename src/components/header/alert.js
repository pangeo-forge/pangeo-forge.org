import { Link } from '@/components/link'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const OrchestratorAlert = () => {
  const { query } = useRouter()
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Box mt={14} align='stretch'>
      {query?.orchestratorEndpoint && (
        <Alert status='warning' variant='solid'>
          <AlertIcon />
          <AlertDescription>
            You are viewing a development version of this site, with data
            populated from https://{query.orchestratorEndpoint}. For latest
            version of the production site, navigate to{' '}
            <Link href='https://pangeo-forge.org/'>
              https://pangeo-forge.org/
            </Link>
            .
          </AlertDescription>
          <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={onClose}
          />
        </Alert>
      )}
    </Box>
  ) : (
    <></>
  )
}
