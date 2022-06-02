import { Badge, Box, Button, Flex, Grid, Themed } from 'theme-ui'
import Layout from '../components/layout'

const i = 1

const data = { logs: { 1: 'hello' } }

const LogLine = ({ log }) => {
  return (
    <Grid columns={[2, '1fr 3fr']}>
      <Box>
        {log.timestamp} ({log.level})
      </Box>
      <Box>{log.message}</Box>
    </Grid>
  )
}

const DataflowLogs = ({ i, data }) => {
  return (
    <Box key={i}>
      <Themed.h3>Flow Run {i}</Themed.h3>
      <Box sx={{ bg: '#F5F5F5', p: [2] }}>
        {data.logs.map((log, i) => (
          <Box key={i} sx={{ fontFamily: 'monospace', fontSize: [1] }}>
            <LogLine log={log} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const LogsBrowser = ({ i, data }) => {
  const logsError = null
  const logs = { data: [] }

  return (
    <Layout>
      <Box>
        <Themed.h2>Logs</Themed.h2>
        {logsError && <Box>Error loading logs</Box>}
        {logs &&
          !logsError &&
          logs.data.map((run, i) => <DataflowLogs key={i} i={i} data={run} />)}
      </Box>
    </Layout>
  )
}

export default LogsBrowser
