export const config = {
  runtime: 'experimental-edge',
}

const reprEndpoint = 'https://html-reprs.fly.dev'

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url)

  const datasetURL = searchParams.get('url')
  const requestURL = `${reprEndpoint}/xarray/?url=${datasetURL}`

  const headers = {
    Accept: 'application/json',
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
  }

  try {
    const result = await fetch(requestURL, { headers })
    return new Response(result.body, { status: result.status })
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: `failed to load data. ${err.message}`,
      }),
      { status: 500 },
    )
  }
}
