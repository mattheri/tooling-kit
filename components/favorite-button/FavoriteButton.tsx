"use client";

import { Feed } from "../../feeds/client";
import useFavorite from "../../hooks/useFavorite";
import { StatefulComponent } from "../../types";

interface Props {
  persistentLink: string;
  favoriteId?: string;
  feed: Omit<Feed, "id">;
}

const FavoriteButton: StatefulComponent<Props> = ({
  feed,
  favoriteId,
  persistentLink,
}) => {
  const { onSave, onRemove } = useFavorite(feed, persistentLink, favoriteId);

  const bgColor = favoriteId ? "bg-amber-400" : "white";

  return (
    <>
      <span className="shape-star w-10 h-10 z-20 bg-slate-800 absolute bottom-2 right-2"></span>
      <button
        onClick={favoriteId ? onRemove : onSave}
        type="button"
        className={`shape-star w-8 h-8 z-20 ${bgColor} absolute bottom-3 right-3`}
      ></button>
    </>
  );
};

export default FavoriteButton;
