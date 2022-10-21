import { jsonFetcher, yamlFetcher } from '@/lib/fetchers'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export function useOrchestratorEndpoint() {
  const { query } = useRouter()
  const endpoint = query?.orchestratorEndpoint || 'api.pangeo-forge.org'
  return endpoint
}

// dedupe requests with the same key in a 2 minutes time span (https://swr.vercel.app/docs/options)
// This allows us to avoid making requests for the same data (used on multiple pages e.g.feedstockInfo) multiple times
const defaultDedupingInterval = 120000

export const useFeedstocks = () => {
  const orchestratorEndpoint = useOrchestratorEndpoint()
  const { data, error } = useSWR(
    `https://${orchestratorEndpoint}/feedstocks/`,
    jsonFetcher,
    { refreshInterval: 300000, dedupingInterval: defaultDedupingInterval },
  )
  return {
    feedstocks: data,
    feedstocksError: error,
    isLoading: !data && !error,
  }
}

export const useFeedstock = (id) => {
  const orchestratorEndpoint = useOrchestratorEndpoint()
  const { data, error } = useSWR(
    id ? `https://${orchestratorEndpoint}/feedstocks/${id}` : null,
    jsonFetcher,
    { refreshInterval: 300000, dedupingInterval: defaultDedupingInterval },
  )
  return {
    fs: data,
    fsError: error,
    isLoading: !data && !error,
  }
}

export const useBakeries = () => {
  const orchestratorEndpoint = useOrchestratorEndpoint()
  const { data, error } = useSWR(
    `https://${orchestratorEndpoint}/bakeries/`,
    jsonFetcher,
    { refreshInterval: 3600000, dedupingInterval: defaultDedupingInterval },
  )
  return {
    bakeries: data,
    bakeriesError: error,
    isLoading: !data && !error,
  }
}

export const useBakery = (id) => {
  const orchestratorEndpoint = useOrchestratorEndpoint()
  const { data, error } = useSWR(
    id ? `https://${orchestratorEndpoint}/bakeries/${id}` : null,
    jsonFetcher,
    { refreshInterval: 3600000, dedupingInterval: defaultDedupingInterval },
  )
  return {
    bakery: data,
    bakeryError: error,
    isLoading: !data && !error,
  }
}

export const useRecipeRuns = () => {
  const orchestratorEndpoint = useOrchestratorEndpoint()
  const { data, error } = useSWR(
    `https://${orchestratorEndpoint}/recipe_runs/`,
    jsonFetcher,
    { refreshInterval: 10000 },
  )
  return {
    recipeRuns: data,
    recipeRunsError: error,
    isLoading: !data && !error,
  }
}

export const useFeedstockDatasets = (id, type = 'production') => {
  const orchestratorEndpoint = useOrchestratorEndpoint()
  const { data, error } = useSWR(
    id
      ? `https://${orchestratorEndpoint}/feedstocks/${id}/datasets?type=${type}`
      : null,
    jsonFetcher,
    { refreshInterval: 300000, dedupingInterval: defaultDedupingInterval },
  )

  // sort values by latest run id first and remove duplicates entries

  return {
    datasets: data
      ?.sort((a, b) => b.id - a.id)
      ?.reduce((acc, curr) => {
        const x = acc.find(
          (item) => item.dataset_public_url === curr.dataset_public_url,
        )
        if (!x) {
          return acc.concat([curr])
        } else {
          return acc
        }
      }, []),

    datasetsError: error,
    isLoading: !data && !error,
  }
}
export const useRecipeRun = (id) => {
  const orchestratorEndpoint = useOrchestratorEndpoint()
  const { data, error } = useSWR(
    id ? `https://${orchestratorEndpoint}/recipe_runs/${id}` : null,
    jsonFetcher,
    { refreshInterval: 10000 },
  )
  return {
    recipeRun: data,
    recipeRunError: error,
    isLoading: !data && !error,
  }
}

export const useStats = (key) => {
  const orchestratorEndpoint = useOrchestratorEndpoint()
  const { data, error } = useSWR(
    key ? `https://${orchestratorEndpoint}/stats/${key}` : null,
    jsonFetcher,
    { refreshInterval: 600000 },
  )
  return {
    stat: data,
    statError: error,
    isLoading: !data && !error,
  }
}

export const useRepo = (APIPath) => {
  const { data, error } = useSWR(
    APIPath ? `/api/github/feedstock-meta?path=${APIPath}` : null,
    jsonFetcher,
    { dedupingInterval: defaultDedupingInterval },
  )
  return {
    repo: data,
    repoError: error,
    isLoading: !data && !error,
  }
}

export const useMeta = (spec) => {
  const { data, error } = useSWR(
    spec
      ? `https://raw.githubusercontent.com/${spec}/main/feedstock/meta.yaml`
      : null,
    yamlFetcher,
    { dedupingInterval: defaultDedupingInterval },
  )
  return {
    meta: data,
    metaError: error,
    isLoading: !data && !error,
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
    isLoading: !data && !error,
  }
}

export const useXarrayDatasetRepr = (url) => {
  const reprEndpoint = 'https://api.pangeo-forge.org/repr'
  const { data, error } = useSWR(
    url ? `${reprEndpoint}/xarray/?url=${url}` : null,
    jsonFetcher,
    { dedupingInterval: defaultDedupingInterval },
  )
  return {
    repr: data?.html,
    reprError: error,
    isLoading: !data && !error,
  }
}
