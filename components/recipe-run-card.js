import { Box, Themed } from 'theme-ui'
import Link from 'next/link'
// import { alpha } from '@theme-ui/color'

const RecipeRunCard = ({
  recipe_id,
  started_at,
  message,
  dataset_public_url,
}) => {
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
          padding: [3],
          mt: [2],
          mb: [4],
          pb: [4],
          transition: 'background-color 0.15s',
          // '@media (hover: hover) and (pointer: fine)': {
          //   '&:hover': {
          //     bg: alpha('primary', 0.05),
          //   },
          // },
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
            {started_at}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default RecipeRunCard
