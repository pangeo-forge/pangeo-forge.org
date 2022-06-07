export function TimeDeltaFormatter(millis) {
  const days = millis / 1000 / 86400

  if (days > 2) {
    return Math.floor(days) + ' days ago'
  }

  if (days < 2) {
    const hours = days * 24
    if (hours < 1) {
      const minutes = Math.floor(hours * 60)
      if (minutes == 1) {
        return '1 minute ago'
      }
      return Math.floor(minutes) + ' minutes ago'
    }
    if (hours < 2) {
      return '1 hour ago'
    }
    return Math.floor(hours) + ' hours ago'
  }
  return ''
}
