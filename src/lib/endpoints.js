import { jsonFetcher, yamlFetcher } from '@/lib/fetchers'
import useSWR from 'swr'

export const orchestratorEndpoint = 'api.pangeo-forge.org'

export const useFeedstocks = () => {
  const { data, error } = useSWR(
    `https://${orchestratorEndpoint}/feedstocks/`,
    jsonFetcher,
    { refreshInterval: 300000 }
  )
  return {
    feedstocks: data,
    feedstocksError: error,
  }
}

export const useFeedstock = (id) => {
  const { data, error } = useSWR(
    id ? `https://${orchestratorEndpoint}/feedstocks/${id}` : null,
    jsonFetcher,
    { refreshInterval: 300000 }
  )
  return {
    fs: data,
    fsError: error,
  }
}

export const useBakeries = () => {
  const { data, error } = useSWR(
    `https://${orchestratorEndpoint}/bakeries/`,
    jsonFetcher,
    { refreshInterval: 3600000 }
  )
  return {
    bakeries: data,
    bakeriesError: error,
  }
}

export const useBakery = (id) => {
  const { data, error } = useSWR(
    id ? `https://${orchestratorEndpoint}/bakeries/${id}` : null,
    jsonFetcher,
    { refreshInterval: 3600000 }
  )
  return {
    bakery: data,
    bakeryError: error,
  }
}

export const useRecipeRuns = () => {
  const { data, error } = useSWR(
    `https://${orchestratorEndpoint}/recipe_runs/`,
    jsonFetcher,
    { refreshInterval: 10000 }
  )
  return {
    recipeRuns: data,
    recipeRunsError: error,
  }
}

export const useRecipeRun = (id) => {
  const { data, error } = useSWR(
    id ? `https://${orchestratorEndpoint}/recipe_runs/${id}` : null,
    jsonFetcher,
    { refreshInterval: 10000 }
  )
  return {
    recipeRun: data,
    recipeRunError: error,
  }
}

export const useStats = (key) => {
  const { data, error } = useSWR(
    key ? `https://${orchestratorEndpoint}/stats/${key}` : null,
    jsonFetcher,
    { refreshInterval: 600000 }
  )
  return {
    stat: data,
    statError: error,
  }
}

export const useRepo = (APIPath) => {
  const { data, error } = useSWR(
    APIPath ? `/api/github/feedstock-meta?path=${APIPath}` : null,
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

export const usePrefect = (id, active = true) => {
  let options = {}

  if (active) {
    options = { refreshInterval: 1000 }
  }

  const { data, error } = useSWR(`/api/prefect/${id}`, jsonFetcher, options)
  return {
    prefect: data,
    prefectError: error,
  }
}
