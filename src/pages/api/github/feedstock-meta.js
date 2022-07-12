export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url)

  const requestURL = searchParams.get('path')

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    //'cache-control': 'public, s-maxage=600, stale-while-revalidate=300',
  }

  if (process.env.GITHUB_TOKEN)
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`

  try {
    const result = await fetch(requestURL, { headers })
    return new Response(result.body, { status: result.status })
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: `failed to load data. ${err.message}`,
      }),
      { status: 500 }
    )
  }
}
