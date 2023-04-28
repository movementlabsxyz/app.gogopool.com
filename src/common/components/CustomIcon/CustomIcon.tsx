import { PropsWithChildren } from 'react'

import { CustomIconProps } from './types'

export const CustomIcon = ({
  children,
  height = 24,
  name,
  size,
  viewBox = '0 0 24 24',
  width = 24,
  ...props
}: PropsWithChildren<CustomIconProps>): JSX.Element => {
  return (
    <svg
      aria-labelledby={name}
      height={size || height}
      role="presentation"
      viewBox={viewBox}
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  )
}
