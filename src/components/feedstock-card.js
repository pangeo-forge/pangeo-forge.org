import { useRepo } from '@/lib/endpoints'
import { TimeDeltaFormatter } from '@/lib/time-delta'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { GoMarkGithub } from 'react-icons/go'
import { Box } from 'theme-ui'

const FeedstockCard = ({ props }) => {
  const { spec, id } = props

  const {
    repo: { commit: { message = '', committer: { date = '' } = {} } = {} } = {},
  } = useRepo(spec) || {}
  const timeSinceRun = TimeDeltaFormatter(Date.now() - Date.parse(date))

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
          <Box sx={{ display: 'inline-block', ml: [2] }}>
            <Box
              sx={{
                fontSize: [3],
                fontFamily: 'subtitle',
                fontWeight: 'subtitle',
                verticalAlign: 'bottom',
              }}
            >
              {spec
                .toLowerCase()
                .replace('pangeo-forge/', '')
                .replace('-feedstock', '')}
            </Box>
            <Box
              sx={{
                fontSize: [2],
                fontFamily: 'body',
                display: 'inline-block',
                mt: [2],
                mb: [2],
              }}
            >
              {message}
            </Box>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Box
              sx={{
                display: 'inline-block',
                fontSize: [2],
                fontFamily: 'body',
                color: 'DimGray',
                align: 'right',
              }}
            >
              {timeSinceRun} ago via
            </Box>
            <Box sx={{ px: [2], display: 'inline-block' }}>
              <IconContext.Provider value={{ color: 'DimGray' }}>
                <GoMarkGithub />
              </IconContext.Provider>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default FeedstockCard
