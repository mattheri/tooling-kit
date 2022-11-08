"use client";

import { StatelessComponentWithChildren } from "../../types";

import { When } from "react-if";
import { useEffect, useState } from "react";

const WindowAvailable: StatelessComponentWithChildren = ({ children }) => {
  const [isInBrowserEnv, setIsInBrowserEnv] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsInBrowserEnv(true);
    }
  }, []);

  return <When condition={isInBrowserEnv}>{children}</When>;
};

export default WindowAvailable;
