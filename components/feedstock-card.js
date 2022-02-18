import { Box, Themed } from 'theme-ui'
import Link from 'next/link'
// import { alpha } from '@theme-ui/color'

const FeedstockCard = ({ spec, provider }) => {
  // TODO: link to a stand-alone feedstock page
  const href = 'https://github.com/' + spec

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
          {spec}
        </Box>
        <Box
          sx={{
            fontSize: [2],
            my: [2],
            lineHeight: '1.1em',
          }}
        >
          {provider}
        </Box>
      </Box>
    </Link>
  )
}

export default FeedstockCard
