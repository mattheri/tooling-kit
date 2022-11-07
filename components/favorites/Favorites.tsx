"use client";

import useFavorites from "../../hooks/useFavorites";
import FeedsList from "../feeds-list/FeedsList";

import { When } from "react-if";
import Feed from "../feed/Feed";

const Favorites = () => {
  const favorites = useFavorites();

  const feeds = favorites.filter((favorite) => favorite.type === "feed");

  return (
    <div className="max-w-xl">
      <When condition={feeds.length}>
        <h2 className="w-full bg-white text-4xl font-black mb-3 text-sky-800">
          Feeds
        </h2>
        <FeedsList>
          {feeds.map(({ feed }) => (
            <Feed key={feed?.id} {...feed!} />
          ))}
        </FeedsList>
      </When>
    </div>
  );
};

export default Favorites;
