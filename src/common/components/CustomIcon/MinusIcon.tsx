import { CustomIcon } from './CustomIcon'
import { CustomIconProps } from './types'

export const MinusIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M5 12H19"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </CustomIcon>
)
