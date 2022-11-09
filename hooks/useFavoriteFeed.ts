import { useMemo, useCallback, useState } from "react";
import Db from "../favorites/db";
import { nanoid } from "nanoid";
import { Feed } from "../feeds/client";
import { useLiveQuery } from "dexie-react-hooks";

const useFavorite = (feed: Omit<Feed, "id">) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const db = useMemo(() => new Db(), []);

  const onSave = useCallback(async () => {
    await db.feed.put({
      id: nanoid(),
      ...feed,
    });
  }, [db]);

  const onRemove = useCallback(async () => {
    await db.feed.where("link").equals(feed.link).delete();
  }, [db]);

  useLiveQuery(() => {
    try {
      db.feed
        .where("link")
        .equals(feed.link)
        .first()
        .then((dbFeed) => {
          if (dbFeed?.link === feed.link) {
            setIsFavorited(true);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [feed.link]);

  return { onSave, onRemove, isFavorited };
};

export default useFavorite;
