import {
  gql,
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const QUERY = gql`
  query {
    flow_run(
      where: {
        name: { _ilike: "https_api-staging.pangeo-forge.org_recipe_runs_41%" }
      }
    ) {
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
  // https://learn.vonage.com/blog/2020/03/12/using-apollo-to-query-graphql-from-node-js-dr/

  let variables = undefined
  if (req.body.variables) {
    variables = JSON.parse(decodeURIComponent(req.body.variables))
  }

  try {
    const result = await client.query({ query: QUERY, variables: variables })
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.sendStatus(500).send(JSON.stringify(err))
  }
}
