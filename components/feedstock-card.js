import { Box } from 'theme-ui'
import Link from 'next/link'
import { useRepo } from '../lib/endpoints'
import { GoMarkGithub } from 'react-icons/go'
import { GiAnvil } from 'react-icons/gi'

const FeedstockCard = ({ props }) => {
  const { spec, provider, id } = props

  const { repo: { commit: { message = '' } = {} } = {} } = useRepo(spec) || {}

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
          mt: [2],
          mb: [4],
          pb: [4],
        }}
      >
        <GiAnvil />

        <Box
          sx={{
            fontSize: [4],
            fontFamily: 'heading',
            fontWeight: 'heading',
            display: 'inline-block',
          }}
        >
          {spec.replace('pangeo-forge/', '')}
        </Box>

        {message && (
          <Box
            sx={{
              fontSize: [1],
              fontFamily: 'monospace',
              display: 'inline-block',
            }}
          >
            {message}
          </Box>
        )}
        <Box sx={{ display: 'inline-block' }}>
          <GoMarkGithub />
        </Box>
      </Box>
    </Link>
  )
}

export default FeedstockCard
