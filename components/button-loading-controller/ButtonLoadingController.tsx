"use client";

import type { StatefulComponentWithChildren } from "../../types";
import { Children, cloneElement, useMemo } from "react";
import Spinner from "../spinner/Spinner";
import FullScreenLoading from "../full-screen-loading/FullScreenLoading";

interface Props {
  isLoading: boolean;
  localizedLoading?: boolean;
}

const ButtonLoadingController: StatefulComponentWithChildren<Props> = ({
  isLoading,
  localizedLoading = true,
  children,
}) => {
  const LoadingElement = useMemo(
    () => (localizedLoading ? <Spinner big={false} /> : <FullScreenLoading />),
    [localizedLoading]
  );

  return Children.only(
    cloneElement(children as JSX.Element, {
      isLoading,
      ...(children as JSX.Element).props,
      disabled: isLoading,
      children: isLoading
        ? LoadingElement
        : (children as JSX.Element).props.children,
    })
  );
};

export default ButtonLoadingController;
