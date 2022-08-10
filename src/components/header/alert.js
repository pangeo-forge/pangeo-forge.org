import { Link } from '@/components/link'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const OrchestratorAlert = () => {
  const { query } = useRouter()
  const endpoint = `https://${query.orchestratorEndpoint}`
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <>
      {query?.orchestratorEndpoint && (
        <Alert
          mt={12}
          status='warning'
          variant='solid'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <AlertIcon />
          <AlertDescription>
            You are viewing a development version of this site, with data
            populated from{' '}
            <Link href={endpoint} useExternalIcon>
              {endpoint}
            </Link>
            . For latest version of the production site, navigate to{' '}
            <Link href='https://pangeo-forge.org/'>
              https://pangeo-forge.org/
            </Link>
            .
          </AlertDescription>
          <CloseButton mx={4} onClick={onClose} />
        </Alert>
      )}
    </>
  ) : null
}
