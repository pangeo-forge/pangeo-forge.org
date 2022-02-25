import useSWR from 'swr'
import { jsonFetcher, yamlFetcher } from './fetchers'

const orchestratorEndpoint = 'https://api-staging.pangeo-forge.org'

export const useFeedstocks = () => {
  const { data, error } = useSWR(
    `${orchestratorEndpoint}/feedstocks/`,
    jsonFetcher
  )
  return {
    feedstocks: data,
    feedstocksError: error,
  }
}

export const useFeedstock = (id) => {
  const { data, error } = useSWR(
    id ? `${orchestratorEndpoint}/feedstocks/${id}` : null,
    jsonFetcher
  )
  return {
    fs: data,
    fsError: error,
  }
}

export const useRecipeRuns = () => {
  console.log()
  const { data, error } = useSWR(
    `${orchestratorEndpoint}/recipe_runs/`,
    jsonFetcher
  )
  return {
    recipeRuns: data,
    recipeRunsError: error,
  }
}

export const useRecipeRun = (id) => {
  const { data, error } = useSWR(
    id ? `${orchestratorEndpoint}/recipe_runs/${id}` : null,
    jsonFetcher
  )
  return {
    recipeRun: data,
    recipeRunError: error,
  }
}

export const useRepo = (spec) => {
  console.log(`https://api.github.com/repos/${spec}/commits/HEAD`)
  const { data, error } = useSWR(
    spec ? `https://api.github.com/repos/${spec}/commits/HEAD` : null,
    jsonFetcher
  )
  return {
    repo: data,
    repoError: error,
  }
}

export const useMeta = (spec) => {
  const { data, error } = useSWR(
    spec
      ? `https://raw.githubusercontent.com/${spec}/main/feedstock/meta.yaml`
      : null,
    yamlFetcher
  )
  return {
    meta: data,
    metaError: error,
  }
}
