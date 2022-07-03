export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

export function isSuccessfulProductionRun(run) {
  return (
    run.is_test === false &&
    run.status === 'completed' &&
    run.conclusion === 'success' &&
    isValidUrl(run.dataset_public_url)
  )
}

export function getDatasets(runs) {
  return runs
    .filter((run) => isSuccessfulProductionRun(run))
    .map((run) => run.dataset_public_url)
}

export function getProductionRunInfo(id, runs) {
  let datasets = getDatasets(runs)
  let datasetsUrl = ''
  let isProduction = false

  if (datasets && datasets.length > 0) {
    isProduction = true
    datasetsUrl = `/dataset/${id}`
    datasets = [...new Set(datasets)].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' })
    )
  }

  return {
    isProduction,
    datasetsUrl,
    datasets,
  }
}

export function groupProductionRuns(runs, key = 'feedstock_id') {
  let groupedRuns = runs.reduce(
    (entryMap, run) =>
      entryMap.set(
        run[key],
        [
          ...(entryMap.get(run[key]) || []),
          isSuccessfulProductionRun(run) ? run : undefined,
        ].filter(Boolean)
      ),
    new Map()
  )

  groupedRuns = [...groupedRuns]
    .map(([key, value]) => ({ key, value }))
    .filter((item) => item.value.length !== 0)
  return groupedRuns
}
