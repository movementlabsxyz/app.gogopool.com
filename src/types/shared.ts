import { CustomIconProps } from "@/common/components/CustomIcon/types";

export type IconType = (props: CustomIconProps) => JSX.Element;

export interface MenuItemType {
  name: string;
  icon: IconType;
  url: string;
}