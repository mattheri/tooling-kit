import { useMemo, useState, useCallback } from "react";
import Db, { IFavorite, IFeed } from "../favorites/db";
import { useLiveQuery } from "dexie-react-hooks";
import useWindow from "./useWindow";

interface Favorite extends IFavorite {
  feed?: IFeed;
}

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const db = useMemo(() => new Db(), []);
  const w = useWindow();

  const getFavorites = useCallback(async () => {
    const favorites = await db.favorite.toArray();
    const feeds = await db.feed.toArray();

    const favoriteFeeds = favorites.map((favorite) => {
      const feed = feeds.find((feed) => feed.favorite === favorite.id);

      return { ...favorite, feed };
    });

    setFavorites(favoriteFeeds);
  }, [db]);

  useLiveQuery(() => {
    try {
      getFavorites();
    } catch (e) {
      console.error(e);
    }
  }, [db, w]);

  return favorites;
};

export default useFavorites;
