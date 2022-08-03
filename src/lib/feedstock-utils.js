export function getName(repo) {
  return repo.replace('pangeo-forge/', '').replace(new RegExp('_', 'g'), '-')
}
