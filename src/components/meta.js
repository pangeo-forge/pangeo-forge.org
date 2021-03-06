import { theme } from '@/theme'
import Head from 'next/head'

const makeTitle = (title, name) =>
  title === name ? title : `${title} – ${name}`

export const Meta = ({
  title = 'Pangeo-Forge',
  name = 'Pangeo-Forge',
  description = 'A cloud-native data repository for ocean, weather, and climate science.',
  image = 'pangeo-forge.org/pangeo-forge-logo-white.png', // social card image URL
  url = 'pangeo-forge.org',
  children,
}) => (
  <Head>
    <meta key='og_locale' property='og:locale' content='en_US' />
    <meta key='og_type' property='og:type' content='website' />
    <meta key='og_site' property='og:site_name' content={name} />
    <title key='title'>{makeTitle(title, name)}</title>
    <meta key='og_title' property='og:title' content={makeTitle(title, name)} />
    <meta
      key='tw_title'
      name='twitter:title'
      content={makeTitle(title, name)}
    />
    {description && (
      <>
        <meta key='desc' name='description' content={description} />
        <meta key='og_desc' property='og:description' content={description} />
        <meta key='tw_desc' name='twitter:description' content={description} />
      </>
    )}
    {image && (
      <>
        <meta key='og_img' property='og:image' content={image} />
        <meta key='tw_card' name='twitter:card' content='summary_large_image' />
        <meta key='tw_img' name='twitter:image' content={image} />
      </>
    )}
    <meta
      key='theme_color'
      name='theme-color'
      //content={theme.colors.primary}
    />
    <meta
      key='tile_color'
      name='msapplication-TileColor'
      //content={theme.colors.primary}
    />
    <link
      key='safari_icon'
      rel='mask-icon'
      href={`${url}/favicon.ico`}
      //color={theme.colors.primary}
    />
    <link
      key='apple_icon'
      rel='apple-touch-icon'
      sizes='180x180'
      href={`/favicon.ico`}
    />
    <link
      key='favicon_32'
      rel='icon'
      type='image/png'
      sizes='32x32'
      href={`/favicon.ico`}
    />
    <link
      key='favicon_16'
      rel='icon'
      type='image/png'
      sizes='16x16'
      href={`/favicon.ico`}
    />
    {/* <link key='manifest' rel='manifest' href={`${url}/site.webmanifest`} /> */}
    {children}
  </Head>
)
