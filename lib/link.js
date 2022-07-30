import Link from 'next/link'
import { useRouter } from 'next/router'

export const LinkWithQuery = ({ children, href, ...props }) => {
  const { query } = useRouter()
  let paramsToAppend = ''
  if ('orchestratorEndpoint' in query) {
    paramsToAppend = `?orchestratorEndpoint=${query.orchestratorEndpoint}`
  }
  return (
    <Link href={href + paramsToAppend} {...props}>
      {children}
    </Link>
  )
}
