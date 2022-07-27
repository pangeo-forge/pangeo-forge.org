import { Icon } from '@chakra-ui/react'
import {
  BsCheckCircleFill,
  BsFillDashCircleFill,
  BsFillExclamationOctagonFill,
  BsFillRecordCircleFill,
  BsFillSlashCircleFill,
  BsFillXCircleFill,
} from 'react-icons/bs'
import { FaCircle } from 'react-icons/fa'

export const StatusIndicatorIcon = ({ status, conclusion, ...props }) => {
  if (status === 'queued') {
    return <Icon as={FaCircle} fontSize={'2xl'} color={'gray.400'} {...props} />
  }

  if (status === 'in_progress') {
    return (
      <Icon
        as={BsFillRecordCircleFill}
        fontSize={'2xl'}
        color={'yellow.500'}
        {...props}
      />
    )
  }

  if (status === 'completed') {
    switch (conclusion) {
      case 'success':
        return (
          <Icon
            as={BsCheckCircleFill}
            fontSize={'2xl'}
            color={'green.400'}
            {...props}
          />
        )

      case 'failure':
        return (
          <Icon
            as={BsFillXCircleFill}
            fontSize={'2xl'}
            color={'red.400'}
            {...props}
          />
        )

      case 'action_required':
        return (
          <Icon
            as={BsFillExclamationOctagonFill}
            fontSize={'2xl'}
            color={'blue.400'}
            {...props}
          />
        )

      case 'neutral':
        return (
          <Icon as={FaCircle} fontSize={'2xl'} color={'gray.400'} {...props} />
        )

      case 'stale':
        return (
          <Icon as={FaCircle} fontSize={'2xl'} color={'gray.400'} {...props} />
        )

      case 'cancelled':
        return (
          <Icon
            as={BsFillExclamationOctagonFill}
            fontSize={'2xl'}
            color={'gray.400'}
            {...props}
          />
        )

      case 'skipped':
        return (
          <Icon
            as={BsFillSlashCircleFill}
            fontSize={'2xl'}
            color={'gray.400'}
            {...props}
          />
        )

      case 'timed_out':
        return (
          <Icon
            as={BsFillDashCircleFill}
            fontSize={'2xl'}
            color={'red.400'}
            {...props}
          />
        )
    }
  }
}
