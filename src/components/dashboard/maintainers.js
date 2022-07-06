import { Link } from '@/components'
import { Avatar, Wrap, WrapItem } from '@chakra-ui/react'

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
