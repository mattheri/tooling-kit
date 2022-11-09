"use client";

import dynamic from "next/dynamic";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState, Children, cloneElement } from "react";
import Db from "../favorites/db";
import { When } from "react-if";
import { StatefulComponentWithChildren } from "../types";

const FavoriteToolsLoader: StatefulComponentWithChildren = ({ children }) => {
  const [favoritedComponents, setFavoritedComponents] = useState<any[]>([]);

  const db = useMemo(() => new Db(), []);

  const importFavoriteTool = async (componentName: string) => {
    const component = dynamic(() => import(`/components/${componentName}`));

    setFavoritedComponents((prev) => [...new Set([...prev, component])]);
  };

  useLiveQuery(() => {
    db.tool.toArray().then((tools) => {
      setFavoritedComponents([]);

      tools.forEach(({ component }) => {
        importFavoriteTool(component);
      });
    });
  });

  return (
    <When condition={favoritedComponents.length && !!children}>
      {Children.map(children!, (child: any) =>
        cloneElement(child, { favoritedComponents, ...child.props })
      )}
    </When>
  );
};

export default FavoriteToolsLoader;
