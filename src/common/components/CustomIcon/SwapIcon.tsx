import { CustomIcon } from './CustomIcon'
import { CustomIconProps } from './types'

export const SwapIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M17 6L17 20"
      fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M21 16L17 20L13 16"
      fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M7 18L7 4"
      fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M3 8L7 4L11 8"
      fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </CustomIcon>
)
