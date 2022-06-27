export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  {
    label: 'Dashboard',
    href: '/dashboard/feedstocks',
    children: [
      { label: 'Feedstocks', href: '/dashboard/feedstocks', subLabel: '' },
      { label: 'Bakeries', href: '/dashboard/bakeries' },
      { label: 'Recipe-Runs', href: '/dashboard/recipe-runs' },
    ],
  },
  { label: 'Docs', href: 'https://pangeo-forge.readthedocs.io/en/latest/' },
]
