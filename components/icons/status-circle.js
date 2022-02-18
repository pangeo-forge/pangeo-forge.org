import React from 'react'
import { Box } from 'theme-ui'

const statusColor = {
  ok: 'green',
  queued: 'yellow',
  failed: 'red',
}

const statusPath = {
  ok: 'M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z',
  queued:
    'M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z',
  failed:
    'M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z',
}

const StatusCircle = ({ status, ...props }) => {
  const color = statusColor[status]
  const path = statusPath[status]
  return (
    <Box
      as='svg'
      viewBox='0 0 16 16'
      fill={color}
      width='16'
      height='16'
      {...props}
    >
      <g>
        <path d={path} />
      </g>
    </Box>
  )
}

export default StatusCircle
