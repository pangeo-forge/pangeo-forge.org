export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url)
  const spec = searchParams.get('spec')

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    //'cache-control': 'public, s-maxage=600, stale-while-revalidate=300',
  }

  const requestURL = `https://api.github.com/repos/${spec}/commits/HEAD`

  try {
    const result = await fetch(requestURL, { headers })
    return new Response(result.body, { status: result.status })
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: `failed to load data for ${spec}. ${err.message}`,
      }),
      { status: 500 }
    )
  }
}
