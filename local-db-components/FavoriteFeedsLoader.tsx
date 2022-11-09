"use client";

import { Children, cloneElement } from "react";
import { When } from "react-if";
import useFavorites from "../hooks/useFavorites";
import { StatefulComponentWithChildren } from "../types";

const FavoriteFeedsLoader: StatefulComponentWithChildren = ({ children }) => {
  const favorites = useFavorites();

  const feeds = favorites.filter((favorite) => favorite.type === "feed");

  return (
    <When condition={feeds && feeds.length && !!children}>
      {Children.map(children!, (child: any) =>
        cloneElement(child, { feeds, ...child.props })
      )}
    </When>
  );
};

export default FavoriteFeedsLoader;
