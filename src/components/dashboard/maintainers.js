import { Link } from '@/components'
import { Avatar, AvatarGroup, Wrap, WrapItem } from '@chakra-ui/react'

export const Maintainers = ({ maintainers }) => {
  if (!maintainers) return null
  return (
    <Wrap>
      {maintainers.map((maintainer) => (
        <WrapItem key={maintainer.name}>
          <Avatar
            as={Link}
            name={maintainer.name}
            src={`https://github.com/${maintainer.github}.png`}
            href={
              maintainer.orcid
                ? `https://orcid.org/${maintainer.orcid}`
                : `https://github.com/${maintainer.github}`
            }
          />
        </WrapItem>
      ))}
    </Wrap>
  )
}

export const MaintainersGroup = ({ maintainers }) => {
  if (!maintainers) return null
  return (
    <AvatarGroup size='md' max={5}>
      {maintainers.map((maintainer) => (
        <Avatar
          key={maintainer.name}
          name={maintainer.name}
          src={`https://github.com/${maintainer.github}.png`}
          href={
            maintainer.orcid
              ? `https://orcid.org/${maintainer.orcid}`
              : `https://github.com/${maintainer.github}`
          }
        />
      ))}
    </AvatarGroup>
  )
}
