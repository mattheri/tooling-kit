import FavoritesTool from "../favorites-tool/FavoritesTool";
import FavoriteFeedsLoader from "../../local-db-components/FavoriteFeedsLoader";
import FavoriteFeeds from "../favorite-feeds/FavoriteFeeds";
import FavoriteToolsLoader from "../../local-db-components/FavoriteToolsLoader";

const Favorites = () => {
  return (
    <>
      <FavoriteFeedsLoader>
        <FavoriteFeeds />
      </FavoriteFeedsLoader>
      <FavoriteToolsLoader>
        <FavoritesTool />
      </FavoriteToolsLoader>
    </>
  );
};

export default Favorites;
