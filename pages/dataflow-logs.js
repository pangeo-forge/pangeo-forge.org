import { Badge, Box, Button, Flex, Grid, Themed } from 'theme-ui'
import Layout from '../components/layout'
import { useDataflow } from '../lib/endpoints'

const i = 1

const data = { logs: { 1: 'hello' } }

const LogLine = ({ log }) => {
  return (
    <Grid columns={[2, '1fr 3fr']}>
      <Box>
        {log.timestamp} ({log.severity})
      </Box>
      <Box>{log.textPayload}</Box>
    </Grid>
  )
}

const DataflowLogs = ({ allLogLines }) => {
  return (
    <Box key={i}>
      <Themed.h3>Logs</Themed.h3>
      <Box sx={{ bg: '#F5F5F5', p: [2] }}>
        {allLogLines.map((log, i) => (
          <Box key={i} sx={{ fontFamily: 'monospace', fontSize: [1] }}>
            <LogLine log={log} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const LogsBrowser = ({ i, data }) => {
  const { dataflow, dataflowError } = useDataflow(
    // TODO: remove hardcoded args
    'wordcount-example-0',
    '2022-06-01T19:23:26.133337225Z',
    '2022-06-01T19:23:29.133337225Z',
    'INFO',
    true
  )

  if (dataflowError) return <Box>Error loading logs</Box>

  return (
    <Layout>
      <Box>
        <Themed.h2>Logs</Themed.h2>
        {<DataflowLogs allLogLines={dataflow} />}
      </Box>
    </Layout>
  )
}

export default LogsBrowser
