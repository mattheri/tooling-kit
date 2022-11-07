import { asyncComponent } from "../../types";

import FeedsList from "../../components/feeds-list/FeedsList";

import { Feed, queryAllFeeds } from "../../feeds/client";
import {
  cssTricksFeedUrl,
  devToFeedUrl,
  mediumFeedUrl,
  normalizedNames,
} from "../../feeds/constants";

const getFeeds = async () => {
  const mediumFeeds = await queryAllFeeds({
    medium: mediumFeedUrl,
  });

  const cssTricksFeeds = await queryAllFeeds({
    cssTricks: cssTricksFeedUrl,
  });

  const devToFeeds = await queryAllFeeds({
    devTo: devToFeedUrl,
  });

  return { ...mediumFeeds, ...cssTricksFeeds, ...devToFeeds };
};

const Feeds = asyncComponent(async () => {
  const feeds = await getFeeds();

  return (
    <>
      {feeds &&
        Object.keys(feeds).map((key) => (
          <FeedsList
            key={key}
            feeds={(feeds as Record<string, Feed[]>)[key]}
            title={normalizedNames[key]}
          />
        ))}
    </>
  );
});

export default Feeds;
