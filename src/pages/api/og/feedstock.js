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
    const result = await yamlFetcher(url)
    const datasets = await jsonFetcher(
      `https://api.pangeo-forge.org/feedstocks/${id}/datasets?type=production`,
    )

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: 'url(https://source.unsplash.com/1L71sPT5XKc)',
            fontSize: 32,
            letterSpacing: -2,
            fontWeight: 400,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: 'rgba(255, 255, 255, 1)',
            }}
          >
            <div
              style={{
                display: 'flex',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{}}>Feedstock: {result.title}</h1>
                <p>Bakery: {result.bakery.id}</p>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <p style={{ marginRight: 5 }}>Maintainers: </p>
                  {result.maintainers.map((maintainer) => (
                    <span
                      key={maintainer.github}
                      style={{
                        position: 'relative',
                        border: '0.5px solid',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        width: '100px',
                      }}
                    >
                      <img
                        style={{
                          width: '100px',
                          height: '100px',
                        }}
                        src={`https://github.com/${maintainer.github}.png`}
                      />
                    </span>
                  ))}
                </div>
                <p>License: {result.provenance.license}</p>
                <p>Dataset Count: {datasets.length}</p>
              </div>
              <img
                src='https://pangeo-forge.org/pangeo-forge-logo-white.png'
                style={{}}
              />
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
