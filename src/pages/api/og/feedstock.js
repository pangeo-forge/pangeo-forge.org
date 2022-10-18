import { getName } from '@/lib/feedstock-utils'
import { jsonFetcher, yamlFetcher } from '@/lib/fetchers'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const spec = searchParams.get('repo')
    const name = getName(spec)

    const meta = spec.toLowerCase().includes('staged-recipes')
      ? {}
      : await yamlFetcher(
          `https://raw.githubusercontent.com/${spec}/main/feedstock/meta.yaml`,
        )

    const title = searchParams.get('title') || meta?.title || '-'

    const bakery = meta?.bakery?.id || '-'
    const license =
      searchParams.get('license') || meta.provenance?.license_link
        ? meta.provenance?.license_link?.title
        : meta.provenance?.license || '-'

    const endpoint =
      searchParams.get('endpoint') || 'https://api.pangeo-forge.org'
    const recipeRuns = await jsonFetcher(`${endpoint}/feedstocks/${id}/`)
    const runs = recipeRuns?.recipe_runs?.length || 0
    const data = await jsonFetcher(
      `${endpoint}/feedstocks/${id}/datasets?type=production`,
    )
    const datasets = data?.length || 0

    const maintainers = meta?.maintainers

    const labelStyle = {
      fontSize: 24,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    }

    const wrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }

    const valueStyle = {
      fontSize: 52,
      margin: '-24px 0px 10px 0px',
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }

    const metadataStyle = {
      fontSize: 36,
      margin: '-10px 0px 10px 0px',
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }

    const avatarStyle = {
      top: 0,
      left: 0,
      width: '72px',
      height: '72px',
      borderRadius: '20%',
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            flexDirection: 'column',
            backgroundColor: '#473681',
            boxSizing: 'border-box',
            color: '#fff',
            padding: '74px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '67%',
              }}
            >
              <div style={{ ...wrapperStyle, marginTop: '-24px' }}>
                <p style={labelStyle}>Title</p>
                <p style={valueStyle}>{title}</p>
              </div>
              <div style={wrapperStyle}>
                <p style={labelStyle}>Feedstock</p>
                <p style={valueStyle}>{name}</p>
              </div>
              <div style={wrapperStyle}>
                <p style={labelStyle}>Bakery</p>
                <p style={valueStyle}>{bakery}</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <img
                style={{ width: '340px', height: '250px' }}
                src='https://raw.githubusercontent.com/pangeo-forge/pangeo-forge.org/main/public/pangeo-forge-logo-white.png'
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '40%',
              }}
            >
              <p style={labelStyle}>Maintainers</p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0px 0px 0px 0px',
                }}
              >
                {maintainers?.map((maintainer, i) => (
                  <img
                    key={maintainer.github}
                    style={{
                      ...avatarStyle,
                      marginLeft: i > 0 ? '16px' : 0,
                    }}
                    src={`https://github.com/${maintainer.github}.png`}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                width: '60%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '28%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  margin: '0px 10px',
                }}
              >
                <p style={labelStyle}>Datasets</p>
                <p style={metadataStyle}>{datasets}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '38%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  margin: '0px 10px',
                }}
              >
                <p style={labelStyle}>Recipe Runs</p>
                <p style={metadataStyle}>{runs}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '33%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  margin: '0px 10px',
                }}
              >
                <p style={labelStyle}>License</p>
                <p style={metadataStyle}>{license}</p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.log(`Error: ${error.message}`)
    return new Response('Failed to generate image', { status: 500 })
  }
}
