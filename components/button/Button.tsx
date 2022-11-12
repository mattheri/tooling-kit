"use client";

import { ButtonHTMLAttributes } from "react";
import { StatelessComponentWithChildren } from "../../types";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: StatelessComponentWithChildren<Props> = ({
  children,
  className,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={cn(
        "bg-sky-800 hover:bg-sky-700 transition-colors text-white font-black rounded-lg h-16 w-full p-4 flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
