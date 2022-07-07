import { Avatar as ChakraAvatar, AvatarProps as ChakraAvatarProps } from "@chakra-ui/react";
import { memo } from "react";

export type AvatarProps = ChakraAvatarProps;

export const Avatar = memo(({ ...props }: AvatarProps): JSX.Element => {
  return <ChakraAvatar {...props} />;
});
