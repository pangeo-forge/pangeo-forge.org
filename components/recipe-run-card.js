import { Box } from 'theme-ui'
import Link from 'next/link'

function TimeDeltaFormatter(millis) {
  const days = millis / 1000 / 86400

  if (days > 2) {
    return Math.floor(days) + ' days ago'
  }

  if (days < 1) {
    const hours = Math.floor(days * 24)
    if (hours < 1) {
      const minutes = Math.floor(hours * 60)
      return minutes + ' minutes ago'
    }
    return hours + ' hours ago'
  }
  return ''
}

const RecipeRunCard = ({ props }) => {
  const { recipe_id, started_at, message, dataset_public_url } = props

  // TODO: have API return timestamps with UTC suffix
  // Here I'm mannually adding the +Z
  const timeSinceRun = TimeDeltaFormatter(
    Date.now() - Date.parse(started_at + 'Z')
  )

  return (
    <Link
      href={recipe_id}
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
          borderColor: 'primary',
          borderWidth: '1px',
          borderStyle: 'solid',
          mt: [0],
          mb: [0],
          pt: [3],
          pb: [1],
          pl: [3],
          pr: [2],
        }}
      >
        <Box
          sx={{
            fontSize: [4],
            fontFamily: 'heading',
            fontWeight: 'heading',
          }}
        >
          {recipe_id}
        </Box>
        <Box
          sx={{
            fontSize: [2],
            my: [2],
            lineHeight: '1.1em',
          }}
        >
          {message}
        </Box>
        <Box
          sx={{
            mt: [3],
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              backgroundColor: 'green',
              borderRadius: '8px',
              verticalAlign: 'bottom',
            }}
          ></Box>
          <Box
            sx={{
              fontSize: [2],
              fontFamily: 'faux',
              display: 'inline-block',
              verticalAlign: 'bottom',
              ml: ['12px'],
            }}
          >
            {timeSinceRun}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default RecipeRunCard
