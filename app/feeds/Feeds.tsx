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
  const feeds = await queryAllFeeds({
    medium: mediumFeedUrl,
    cssTricks: cssTricksFeedUrl,
    devTo: devToFeedUrl,
  });

  return { ...feeds };
};

const Feeds = asyncComponent(async () => {
  const feeds = await getFeeds();

  return (
    <>
      {Object.keys(feeds).map((key) => (
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
