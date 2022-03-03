import useSWR from 'swr'
import { jsonFetcher, yamlFetcher } from './fetchers'

export const orchestratorEndpoint = 'api.pangeo-forge.org'

export const useFeedstocks = () => {
  const { data, error } = useSWR(
    `https://${orchestratorEndpoint}/feedstocks/`,
    jsonFetcher
  )
  return {
    feedstocks: data,
    feedstocksError: error,
  }
}

export const useFeedstock = (id) => {
  const { data, error } = useSWR(
    id ? `https://${orchestratorEndpoint}/feedstocks/${id}` : null,
    jsonFetcher
  )
  return {
    fs: data,
    fsError: error,
  }
}

export const useBakeries = () => {
  const { data, error } = useSWR(
    `https://${orchestratorEndpoint}/bakeries/`,
    jsonFetcher
  )
  return {
    bakeries: data,
    bakeriesError: error,
  }
}

export const useBakery = (id) => {
  const { data, error } = useSWR(
    id ? `https://${orchestratorEndpoint}/bakeries/${id}` : null,
    jsonFetcher
  )
  return {
    bakery: data,
    bakeryError: error,
  }
}

export const useRecipeRuns = () => {
  const { data, error } = useSWR(
    `https://${orchestratorEndpoint}/recipe_runs/`,
    jsonFetcher
  )
  return {
    recipeRuns: data,
    recipeRunsError: error,
  }
}

export const useRecipeRun = (id) => {
  const { data, error } = useSWR(
    id ? `https://${orchestratorEndpoint}/recipe_runs/${id}` : null,
    jsonFetcher
  )
  return {
    recipeRun: data,
    recipeRunError: error,
  }
}

export const useStats = (key) => {
  const { data, error } = useSWR(
    key ? `https://${orchestratorEndpoint}/stats/${key}` : null,
    jsonFetcher
  )
  return {
    stat: data,
    statError: error,
  }
}

export const useRepo = (spec) => {
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

export const usePrefect = (id) => {
  const { data, error } = useSWR(`/api/prefect/${id}`, yamlFetcher)
  return {
    prefect: data,
    prefectError: error,
  }
}
