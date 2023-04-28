import { CustomIcon } from './CustomIcon'
import { CustomIconProps } from './types'

export const RewardIcon = (props: CustomIconProps) => (
  <CustomIcon fill="none" {...props}>
    <path
      d="M12 2L15.09 8.25342L22 9.26236L17 14.1272L18.18 21L12 17.7534L5.82 21L7 14.1272L2 9.26236L8.91 8.25342L12 2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </CustomIcon>
)
