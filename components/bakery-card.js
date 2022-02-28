import { Box } from 'theme-ui'
import Link from 'next/link'
import { BsGlobe2 } from 'react-icons/bs'
import { IconContext } from 'react-icons'

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
        }}
      >
        <Box
          sx={{
            fontSize: [3],
            fontFamily: 'subtitle',
            fontWeight: 'subtitle',
            display: 'inline-block',
            verticalAlign: 'bottom',
          }}
        >
          {name}
        </Box>
        <Box
          sx={{
            fontSize: [2],
            fontFamily: 'body',
            display: 'inline-block',
            mt: [2],
          }}
        >
          {description}
        </Box>
        <Box
          sx={{
            mt: [3],
            textAlign: 'right',
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              fontSize: [2],
              fontFamily: 'body',
              color: 'DimGray',
              verticalAlign: 'top',
            }}
          >
            {region}
          </Box>

          <Box sx={{ px: [2], display: 'inline-block' }}>
            <IconContext.Provider value={{ color: 'DimGray' }}>
              <BsGlobe2 />
            </IconContext.Provider>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default BakeryCard
