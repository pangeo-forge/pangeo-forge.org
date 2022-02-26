import { Box } from 'theme-ui'
import Link from 'next/link'
import { useRepo } from '../lib/endpoints'
import { GoMarkGithub } from 'react-icons/go'
import { GiAnvil } from 'react-icons/gi'
import { TimeDeltaFormatter } from '../lib/time-delta'

const FeedstockCard = ({ props }) => {
  const { spec, provider, id } = props

  // const { repo: { commit: { message = '', committer: { date=''} = {} } = {} } = {} } = useRepo(spec) || {}
  const message = 'My latest commit message'
  // const timeSinceRun = TimeDeltaFormatter(
  //   Date.now() - Date.parse(date)
  // )
  const timeSinceRun = '19 days'

  const href = '/dashboard/feedstock/' + id

  return (
    <Link
      href={href}
      passHref
      sx={{
        textDecoration: 'none',
        '&:hover': {
          color: 'primary',
        },
      }}
    >
      <Box
        sx={{
          cursor: 'pointer',
          borderColor: 'purple',
          borderWidth: '1px',
          borderStyle: 'solid',
          padding: [3],
        }}
      >
        <Box>
          <Box sx={{ display: 'inline-block', verticalAlign: 'bottom' }}>
            <GiAnvil size={24} />
          </Box>

          <Box
            sx={{
              fontSize: [4],
              fontFamily: 'subtitle',
              fontWeight: 'subtitle',
              display: 'inline-block',
              verticalAlign: 'bottom',
              ml: [2],
            }}
          >
            {spec.replace('pangeo-forge/', '')}
          </Box>
        </Box>
        <Box
          sx={{
            fontSize: [3],
            fontFamily: 'body',
            display: 'inline-block',
            mt: [2],
            mb: [2],
          }}
        >
          {message}
        </Box>
        <Box>
          <Box
            sx={{
              display: 'inline-block',
              fontSize: [3],
              fontFamily: 'body',
              color: 'text',
            }}
          >
            {timeSinceRun} ago via
          </Box>
          <Box sx={{ px: [2], display: 'inline-block' }}>
            <GoMarkGithub />
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default FeedstockCard
