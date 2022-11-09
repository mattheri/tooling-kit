import { useMemo, useCallback } from "react";
import Db from "../favorites/db";
import { nanoid } from "nanoid";
import { Feed } from "../feeds/client";

const useFavorite = (feed: Omit<Feed, "id">) => {
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

  return { onSave, onRemove };
};

export default useFavorite;
