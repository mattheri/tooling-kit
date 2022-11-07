import { useMemo, useCallback } from "react";
import Db from "../favorites/db";
import { nanoid } from "nanoid";
import { Feed } from "../feeds/client";

const useFavorite = (
  feed: Omit<Feed, "id">,
  persistentLink: string,
  favoriteId?: string
) => {
  const db = useMemo(() => new Db(), []);

  const createFavorite = useCallback(async () => {
    return await db.favorite.put({
      type: "feed",
      id: favoriteId || nanoid(),
      persistentLink,
    });
  }, [db]);

  const onSave = useCallback(async () => {
    let id = favoriteId;

    if (!favoriteId) {
      id = await createFavorite();
    }

    await db.feed.put({
      id: nanoid(),
      ...feed,
      favorite: id!,
    });
  }, [db]);

  const onRemove = useCallback(async () => {
    if (favoriteId) {
      const htmlId = await db.html.where("favorite").equals(favoriteId).first();

      if (htmlId) {
        await db.html.delete(htmlId.id);
      }

      await db.favorite.delete(favoriteId);
    }
  }, [db, favoriteId]);

  return { onSave, onRemove };
};

export default useFavorite;
