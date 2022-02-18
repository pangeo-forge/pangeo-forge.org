import { Box } from 'theme-ui'
import Link from 'next/link'
import Git from './icons/Git'

const FeedstockCard = ({ props }) => {
  const { spec, provider } = props

  // TODO: link to a stand-alone feedstock page
  const href = 'https://github.com/' + props.spec

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
          {spec}
        </Box>
        <Box
          sx={{
            mt: [1],
          }}
        >
          <Git />
          <Box
            sx={{
              fontSize: [1],
              display: 'inline-block',
              verticalAlign: 'center',
              ml: ['4px'],
            }}
          >
            {provider}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default FeedstockCard
