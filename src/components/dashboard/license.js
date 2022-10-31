import { Link } from '@/components'

export const License = ({ name, link }) => {
  const href =
    name === 'proprietary' ? link?.url : `https://spdx.org/licenses/${name}`

  const text = name === 'proprietary' ? link?.title : name

  return (
    <>
      <Link href={href} useExternalIcon>
        {text}
      </Link>
    </>
  )
}
