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
  let catalogUrl = ''
  let isProduction = false

  if (datasets && datasets.length > 0) {
    isProduction = true
    catalogUrl = `/catalog/${id}`
    datasets = [...new Set(datasets)]
  }

  return {
    isProduction,
    catalogUrl,
    datasets,
  }
}
