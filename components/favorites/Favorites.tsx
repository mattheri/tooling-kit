"use client";

import FavoritesTool from "../favorites-tool/FavoritesTool";
import FavoriteFeedsLoader from "../../local-db-components/FavoriteFeedsLoader";
import FavoriteFeeds from "../favorite-feeds/FavoriteFeeds";
import FavoriteToolsLoader from "../../local-db-components/FavoriteToolsLoader";
import WindowAvailable from "../window-available/WindowAvailable";

const Favorites = () => {
  return (
    <WindowAvailable>
      <FavoriteFeedsLoader>
        <FavoriteFeeds />
      </FavoriteFeedsLoader>
      <FavoriteToolsLoader>
        <FavoritesTool />
      </FavoriteToolsLoader>
    </WindowAvailable>
  );
};

export default Favorites;
