import { Box, Flex } from 'theme-ui'
import Link from 'next/link'
import { TimeDeltaFormatter } from '@/lib/time-delta'
import { GoCalendar, GoTag } from 'react-icons/go'

const RecipeRunCard = ({ props }) => {
  const { id, recipe_id, started_at, message, status, version } = props

  let statusIcon
  if (status == 'queued') {
    statusIcon = (
      <Box
        sx={{
          display: 'inline-block',
          width: '16px',
          height: '16px',
          backgroundColor: 'yellow',
          borderRadius: '8px',
          verticalAlign: 'top',
        }}
      />
    )
  } else if (status == 'in_progress') {
    statusIcon = (
      <Box
        sx={{
          display: 'inline-block',
          width: '16px',
          height: '16px',
          backgroundColor: 'orange',
          borderRadius: '8px',
          verticalAlign: 'top',
        }}
      />
    )
  } else if (status == 'completed') {
    statusIcon = (
      <Box
        sx={{
          display: 'inline-block',
          width: '16px',
          height: '16px',
          backgroundColor: 'green',
          borderRadius: '8px',
          verticalAlign: 'top',
          borderColor: 'black',
          borderWidth: '1px',
        }}
      />
    )
  }

  // TODO: have API return timestamps with UTC suffix
  // Here I'm mannually adding the +Z
  const timeSinceRun = TimeDeltaFormatter(
    Date.now() - Date.parse(started_at + 'Z')
  )

  const href = '/dashboard/recipe-run/' + id

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
      <Flex
        sx={{
          cursor: 'pointer',
          borderColor: 'primary',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'purple',
          mt: '-1px',
          mb: [0],
          pt: [3],
          pb: [1],
          pl: [3],
          pr: [2],
        }}
      >
        {statusIcon}

        <Box sx={{ flex: '1 1 auto', ml: [2] }}>
          <Box
            sx={{
              fontSize: [3],
              fontFamily: 'body',
              fontWeight: 'body',
            }}
          >
            {recipe_id}
          </Box>
          <Box
            sx={{
              fontSize: [2],
              my: [2],
              fontFamily: 'monospace',
              fontWeight: 'body',
              color: 'gray',
            }}
          >
            {message}
          </Box>
        </Box>
        <Box sx={{ display: 'inline-block', fontSize: [2], mr: [2] }}>
          <Box>
            <GoCalendar /> {timeSinceRun}
          </Box>
          <Box sx={{ my: [2] }}>
            <GoTag /> {version}
          </Box>
        </Box>
      </Flex>
    </Link>
  )
}

export default RecipeRunCard
