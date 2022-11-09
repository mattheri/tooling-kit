import { useMemo, useState, useCallback } from "react";
import Db, { IFeed } from "../favorites/db";
import { useLiveQuery } from "dexie-react-hooks";

const useFavoriteFeeds = () => {
  const [feeds, setFavoriteFeeds] = useState<IFeed[]>([]);

  const db = useMemo(() => new Db(), []);

  const getFavorites = useCallback(async () => {
    const feeds = await db.feed.toArray();

    console.log(feeds);

    setFavoriteFeeds(feeds);
  }, [db]);

  useLiveQuery(() => {
    try {
      getFavorites();
    } catch (e) {
      console.error(e);
    }
  }, [db]);

  return feeds;
};

export default useFavoriteFeeds;
