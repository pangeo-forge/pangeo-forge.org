import useSWR from 'swr'
import { jsonFetcher, yamlFetcher } from './fetchers'
import { useRouter } from 'next/router'

function getOrchestratorEndpoint() {
  const { query } = useRouter()
  let endpoint = 'api.pangeo-forge.org'
  if ('orchestratorEndpoint' in query) {
    endpoint = query.orchestratorEndpoint
  }
  return endpoint
}

export const useFeedstocks = () => {
  const { data, error } = useSWR(
    `https://${getOrchestratorEndpoint()}/feedstocks/`,
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
    id ? `https://${getOrchestratorEndpoint()}/feedstocks/${id}` : null,
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
    `https://${getOrchestratorEndpoint()}/bakeries/`,
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
    id ? `https://${getOrchestratorEndpoint()}/bakeries/${id}` : null,
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
    `https://${getOrchestratorEndpoint()}/recipe_runs/`,
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
    id ? `https://${getOrchestratorEndpoint()}/recipe_runs/${id}` : null,
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
    key ? `https://${getOrchestratorEndpoint()}/stats/${key}` : null,
    jsonFetcher,
    { refreshInterval: 600000 }
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
