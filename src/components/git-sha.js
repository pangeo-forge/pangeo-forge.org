import { Link } from '@/components'
import { Flex, Text } from '@chakra-ui/react'
import { IoGitBranchOutline } from 'react-icons/io5'

export const GitSHA = () => {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
  const owner = process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER
  const slug = process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG

  return sha && owner && slug ? (
    <Flex
      align='center'
      as={Link}
      href={`https://github.com/${owner}/${slug}/tree/${sha}`}
    >
      <IoGitBranchOutline />
      <Text ml={1}>{sha.substring(0, 7)}</Text>
    </Flex>
  ) : null
}
