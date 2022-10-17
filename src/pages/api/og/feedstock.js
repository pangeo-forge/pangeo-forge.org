import { jsonFetcher, yamlFetcher } from '@/lib/fetchers'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const repo = searchParams.get('repo')
    const owner = searchParams.get('owner') || 'pangeo-forge'
    const spec = `${owner}/${repo}`
    const url = `https://raw.githubusercontent.com/${spec}/main/feedstock/meta.yaml`
    const meta = await yamlFetcher(url)
    const result = await jsonFetcher(
      `https://api.pangeo-forge.org/feedstocks/${id}/`,
    )

    const datasets = await jsonFetcher(
      `https://api.pangeo-forge.org/feedstocks/${id}/datasets?type=production`,
    )

    const labelStyle = {
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '0.5em',
    }

    const valueStyle = {
      fontSize: '0.9em',
      fontWeight: 600,
      margin: '5px 10px 20px 0px',
    }

    const avatarStyle = {
      top: 0,
      left: 0,
      width: '72px',
      height: '72px',
      borderRadius: '20%',
      margin: '10px',
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
            padding: '8em',
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
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={labelStyle}>Title</p>
                <p style={valueStyle}>{meta.title}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={labelStyle}>Feedstock</p>
                <p style={valueStyle}>{spec}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={labelStyle}>Bakery</p>
                <p style={valueStyle}>{meta.bakery.id}</p>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <img
                style={{ width: '340px', height: '250px' }}
                src='https://github.com/pangeo-forge/pangeo-forge.org/blob/main/public/pangeo-forge-logo-white.png?raw=true'
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <p style={labelStyle}>Maintainers</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0px 0px 0px 0px',
                }}
              >
                {meta?.maintainers?.map((maintainer) => (
                  <img
                    key={maintainer.github}
                    style={avatarStyle}
                    src={`https://github.com/${maintainer.github}.png`}
                  />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0px 10px',
                }}
              >
                <p style={labelStyle}>Datasets</p>
                <p style={valueStyle}>{datasets ? datasets?.length : '-'}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0px 10px',
                }}
              >
                <p style={labelStyle}>Recipe Runs</p>
                <p style={valueStyle}>{result?.recipe_runs?.length}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0px 10px',
                }}
              >
                <p style={labelStyle}>License</p>
                <p style={valueStyle}>
                  {meta.provenance.license_link
                    ? meta.provenance?.license_link?.title
                    : meta.provenance?.license}
                </p>
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
