import { Box } from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, ReactElement } from "react";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary-filled" | "secondary-outline";
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  iconOnly?: ReactElement;
  full?: boolean;
  onClick?: () => void;
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  size = "md",
  variant = "primary",
  iconLeft,
  iconRight,
  iconOnly,
  full,
  children,
  onClick,
}) => {
  return (
    <Box
      as="button"
      className={`box-border rounded-full ${full ? "w-full" : ""} ${
        variant === "primary"
          ? "bg-green-500 text-grey-1000 hover:bg-green-550 focus:bg-green-550"
          : variant === "secondary-filled"
          ? "bg-blue-500 text-grey-0 hover:bg-blue-550 focus:bg-blue-550"
          : "border-2 border-blue-500 text-blue-500 hover:border-blue-550 focus:border-blue-550"
      } ${
        size === "sm"
          ? iconOnly
            ? "h-[42px] w-[42px] p-3.5"
            : "ps w-fit px-5 py-2.5 font-bold"
          : size === "md"
          ? iconOnly
            ? "h-[50px] w-[50px] p-4"
            : "p w-fit px-6 py-3 font-bold"
          : iconOnly
          ? "h-[58px] w-[58px] p-[18px]" // padding is 20px - 2px since border-box includes border width and padding
          : "pl w-fit px-[26px] py-[12px] font-bold" // same as above
      }`}
      onClick={onClick}
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
