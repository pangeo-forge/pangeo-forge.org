import yaml from 'js-yaml'

export const jsonFetcher = async (url) => {
  const response = await fetch(url)
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!response.ok) {
    const error = new Error(
      `An error occurred while fetching data from URL: ${url}`,
    )
    // Attach extra info to the error object.
    error.info = await response.json()
    error.status = response.status
    throw error
  }

  return response.json()
}
export const yamlFetcher = (url) =>
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => blob.text())
    .then(yaml.load)
