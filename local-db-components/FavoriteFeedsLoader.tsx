"use client";

import { Children, cloneElement } from "react";
import { When } from "react-if";
import useFavoriteFeeds from "../hooks/useFavoriteFeeds";
import { StatefulComponentWithChildren } from "../types";

const FavoriteFeedsLoader: StatefulComponentWithChildren = ({ children }) => {
  const feeds = useFavoriteFeeds();

  return (
    <When condition={feeds && feeds.length && !!children}>
      {Children.map(children!, (child: any) =>
        cloneElement(child, { feeds, ...child.props })
      )}
    </When>
  );
};

export default FavoriteFeedsLoader;
