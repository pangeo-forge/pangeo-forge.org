import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box } from 'theme-ui'

const DashboardMenu = () => {
  const router = useRouter()

  const menuItems = {
    Feedstocks: '/feedstocks',
    Bakeries: '/bakeries',
    'Recipe-Runs': '/recipe-runs',
  }

  return (
    <Box
      sx={{
        mt: [3],
        mb: [3],
        pb: [2],
        borderBottom: 'solid',
        borderColor: 'purple',
        borderWidth: '1px',
      }}
    >
      {Object.keys(menuItems).map((key, i) => (
        <Link key={i} href={menuItems[key]} passHref>
          <Box
            key={i}
            sx={{
              mr: [5],
              display: 'inline-block',
              fontSize: [3],
              color: 'purple',
              borderBottom: router.asPath == menuItems[key] ? 'solid' : null,
              borderWidth: '1px',
              borderColor: 'purple',
            }}
          >
            {key}
          </Box>
        </Link>
      ))}
    </Box>
  )
}

export default DashboardMenu
