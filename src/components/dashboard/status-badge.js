import { Badge } from '@/components'

export const StatusBadge = ({ status, conclusion }) => {
  if (status === 'queued') {
    return <Badge colorScheme='gray' text={'queued'} />
  }

  if (status === 'in_progress') {
    return <Badge colorScheme='yellow' text={'in progress'} />
  }

  if (status === 'completed') {
    switch (conclusion) {
      case 'success':
        return <Badge colorScheme='green' text={'completed'} />

      case 'failure':
        return <Badge colorScheme='red' text={'failed'} />

      case 'action_required':
        return <Badge colorScheme='blue' text={'action required'} />

      case 'cancelled':
        return <Badge colorScheme='gray' text={'cancelled'} />

      case 'neutral':
        return <Badge colorScheme='gray' text={'neutral'} />

      case 'skipped':
        return <Badge colorScheme='gray' text={'skipped'} />

      case 'stale':
        return <Badge colorScheme='gray' text={'stale'} />

      case 'timed_out':
        return <Badge colorScheme='red' text={'timed out'} />

      default:
        return <Badge colorScheme='gray' text={status ? status : 'unknown'} />
    }
  }

  return <Badge colorScheme='gray' text={status ? status : 'unknown'} />
}
