import useSWR from 'swr'

import { Box } from 'theme-ui'
import Link from 'next/link'
import Git from './icons/Git'

const fetcher = (url) => fetch(url).then((r) => r.json())

function RepoData(spec) {
  const { data, error } = useSWR(
    'https://api.github.com/repos/' + spec,
    fetcher
  )
  return data
}

const FeedstockCard = ({ props }) => {
  const { spec, provider, id } = props

  const repo = RepoData(props.spec)

  if (repo) {
    console.log(repo)
    const { license, forks, stargazers_count, pushed_at } = repo
  } else {
    const license = null
    const forks = null
    const stargazers_count = null
    const pushed_at = null
  }

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
          {license && (
            <Box
              sx={{
                fontSize: [1],
                display: 'inline-block',
                verticalAlign: 'center',
                ml: ['4px'],
              }}
            >
              {license.spdx_id}
            </Box>
          )}
          {forks && (
            <Box
              sx={{
                fontSize: [1],
                display: 'inline-block',
                verticalAlign: 'center',
                ml: ['4px'],
              }}
            >
              {forks}
            </Box>
          )}
          {stargazers_count && (
            <Box
              sx={{
                fontSize: [1],
                display: 'inline-block',
                verticalAlign: 'center',
                ml: ['4px'],
              }}
            >
              {stargazers_count}
            </Box>
          )}
          {pushed_at && (
            <Box
              sx={{
                fontSize: [1],
                display: 'inline-block',
                verticalAlign: 'center',
                ml: ['4px'],
              }}
            >
              {pushed_at}
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  )
}

export default FeedstockCard
