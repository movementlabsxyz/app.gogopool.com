import { Box } from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, ReactElement } from "react";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary-filled" | "secondary-outline";
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  iconOnly?: ReactElement;
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  size = "md",
  variant = "primary",
  iconLeft,
  iconRight,
  iconOnly,
  children,
}) => {
  return (
    <Box
      as="button"
      className={`box-border rounded-full ${
        variant === "primary"
          ? "bg-green-500 hover:bg-green-550 focus:bg-green-550 text-grey-1000"
          : variant === "secondary-filled"
          ? "bg-blue-500 hover:bg-blue-550 focus:bg-blue-550 text-grey-0"
          : "border-blue-500 hover:border-blue-550 focus:border-blue-550 border-2 text-blue-500"
      } ${
        size === "sm"
          ? iconOnly
            ? "p-3.5 h-[42px] w-[42px]"
            : "ps font-bold px-5 py-2.5 w-fit"
          : size === "md"
          ? iconOnly
            ? "p-4 h-[50px] w-[50px]"
            : "p font-bold px-6 py-3 w-fit"
          : iconOnly
          ? "p-[18px] h-[58px] w-[58px]" // padding is 20px - 2px since border-box includes border width and padding
          : "pl font-bold px-[26px] py-[12px] w-fit" // same as above
      }`}
    >
      {iconOnly ? (
        <div
          className={`${
            size === "sm"
              ? "h-[14px] w-[14px]"
              : size === "md"
              ? "h-[16px] w-[16px]"
              : "h-[18px] w-[18px]"
          }`}
        >
          {iconOnly}
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center gap-x-2">
          {iconLeft}
          {children}
          {iconRight}
        </div>
      )}
    </Box>
  );
};
