"use client";

import useFavorites from "../../hooks/useFavorites";
import FeedsList from "../feeds-list/FeedsList";

import { When } from "react-if";
import Feed from "../feed/Feed";

const Favorites = () => {
  const favorites = useFavorites();

  const feeds = favorites.filter((favorite) => favorite.type === "feed");

  return (
    <div className="max-w-[120rem]">
      <When condition={feeds.length}>
        <FeedsList title="Feeds">
          {feeds.map(({ feed }) => (
            <Feed key={feed?.id} {...feed!} />
          ))}
        </FeedsList>
      </When>
    </div>
  );
};

export default Favorites;
