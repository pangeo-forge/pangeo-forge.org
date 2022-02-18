import { Box, Themed } from 'theme-ui'
import Link from 'next/link'

const BakeryCard = ({ name, region, description }) => {
  // TODO: get this from the api
  // or link to a stand-alone bakery page
  const href = 'https://github.com/pangeo-forge/pangeo-forge-gcs-bakery'

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
          mt: [2],
          mb: [4],
          pb: [4],
        }}
      >
        <Box
          sx={{
            fontSize: [4],
            fontFamily: 'heading',
            fontWeight: 'heading',
          }}
        >
          {name}
        </Box>
        <Box
          sx={{
            fontSize: [2],
            my: [2],
            lineHeight: '1.1em',
          }}
        >
          {description}
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
            {region}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default BakeryCard
