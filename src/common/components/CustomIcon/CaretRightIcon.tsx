import { CustomIcon } from './CustomIcon'
import { CustomIconProps } from './types'

export const CaretRightIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M9 18L15 12L9 6"
      fill="none"
      stroke={props.stroke || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </CustomIcon>
)
