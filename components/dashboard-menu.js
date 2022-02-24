import Link from 'next/link'
import { Box } from 'theme-ui'

const DashboardMenu = () => {
  const menuItems = {
    Feedstocks: '/dashboard/feedstocks',
    Bakeries: '/dashboard/bakeries',
    'Recipe-Runs': '/dashboard/recipe-runs',
  }

  return (
    <Box sx={{ mt: [3], mb: [3] }}>
      {Object.keys(menuItems).map((key, i) => (
        <Link key={i} href={menuItems[key]} passHref>
          <Box
            key={i}
            sx={{
              ml: [5],
              display: 'inline-block',
              fontSize: [3],
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
