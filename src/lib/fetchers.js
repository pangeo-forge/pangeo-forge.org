import yaml from 'js-yaml'

export const jsonFetcher = (url) => fetch(url).then((r) => r.json())
export const yamlFetcher = (url) =>
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => blob.text())
    .then(yaml.load)
