export function getDatasetName(dataset) {
  return dataset
    .split('/')
    .filter((elem) => elem)
    .slice(-1)
}
