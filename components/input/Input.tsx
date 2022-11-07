import { InputHTMLAttributes, forwardRef, ForwardedRef } from "react";

import cn from "classnames";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(
  ({ className, ...props }: Props, ref: ForwardedRef<any>) => {
    return (
      <input
        {...props}
        className={cn(
          "border-solid border-slate-300 border-2 rounded-md px-3 py-2 w-full focus:outline-4 focus:outline-sky-400",
          className
        )}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
