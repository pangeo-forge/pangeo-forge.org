import { Box } from 'theme-ui'
import Link from 'next/link'
import { BsGlobe2 } from 'react-icons/bs'

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
            fontFamily: 'subtitle',
            fontWeight: 'subtitle',
            display: 'inline-block',
            verticalAlign: 'bottom',
            ml: [2],
          }}
        >
          {name}
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
          {description}
        </Box>
        <Box
          sx={{
            mt: [3],
          }}
        >
          <BsGlobe2 />
          <Box
            sx={{
              display: 'inline-block',
              fontSize: [3],
              fontFamily: 'body',
              color: 'text',
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
