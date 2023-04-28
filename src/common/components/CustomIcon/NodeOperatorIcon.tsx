import { CustomIcon } from './CustomIcon'
import { CustomIconProps } from './types'

export const NodeOperatorIcon = (props: CustomIconProps) => (
  <CustomIcon fill="none" {...props}>
    <circle cx="12" cy="4" r="3" strokeWidth="2" />
    <circle cx="20" cy="12" r="3" strokeWidth="2" />
    <circle cx="4" cy="12" r="3" strokeWidth="2" />
    <path
      d="M15 4.58181C15.9669 4.97233 16.873 5.55952 17.6569 6.34338C18.4974 7.18388 19.1117 8.16488 19.5 9.21077M19.4184 15.0002C19.0279 15.9672 18.4407 16.8732 17.6569 17.6571C16.873 18.4409 15.9669 19.0281 15 19.4187M9 19.4187C8.03307 19.0281 7.12701 18.4409 6.34315 17.6571C5.55929 16.8732 4.9721 15.9672 4.58158 15.0002M4.58158 9.00022C4.9721 8.03329 5.55929 7.12724 6.34315 6.34338C7.12701 5.55952 8.03307 4.97233 9 4.58181"
      strokeWidth="2"
    />
    <circle cx="12" cy="20" r="3" strokeWidth="2" />
  </CustomIcon>
)
