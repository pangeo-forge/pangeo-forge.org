import { Box } from 'theme-ui'
import Link from 'next/link'
import { TimeDeltaFormatter } from '../lib/time-delta'

const RecipeRunCard = ({ props }) => {
  console.log(props)
  const { id, recipe_id, started_at, message, dataset_public_url } = props

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
            fontFamily: 'subtitle',
            fontWeight: 'subtitle',
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
              fontFamily: 'body',
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
