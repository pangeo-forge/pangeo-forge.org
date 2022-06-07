import { orchestratorEndpoint } from '@/lib/endpoints'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const QUERY = gql`
  query FlowRun($name: String!) {
    flow_run(where: { name: { _ilike: $name } }) {
      logs {
        timestamp
        level
        message
      }
    }
  }
`

const httpLink = createHttpLink({
  uri: 'https://api.prefect.io/',
  credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.PREFECT__CLOUD__AUTH_TOKEN
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default async function handler(req, res) {
  // Inspired by:
  // https://learn.vonage.com/blog/2020/03/12/using-apollo-to-query-graphql-from-node-js-dr/

  const { id } = req.query

  const name = `https_${orchestratorEndpoint}_recipe_runs_${id}%`

  try {
    const result = await client.query({ query: QUERY, variables: { name } })
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(JSON.stringify(err))
  }
}
