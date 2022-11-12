import { StatelessComponentWithChildren } from "../../types";
import { forwardRef, HTMLAttributes } from "react";
import type { ForwardedRef } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  ref?: ForwardedRef<HTMLDivElement>;
}

const Drawer: StatelessComponentWithChildren<Props> = forwardRef(
  (
    { isOpen, children, ...props },
    ref: ForwardedRef<HTMLDivElement | null>
  ) => {
    return isOpen ? (
      <div
        ref={ref}
        {...props}
        className={`absolute top-full w-[30rem] z-30 p-4 bg-white shadow-lg rounded-lg -left-[50%]`}
      >
        {children}
      </div>
    ) : null;
  }
);

export default Drawer;
