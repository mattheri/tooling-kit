export const feedsDb = "Feeds";
export const feedsTable = "id, rss_url";
export const key = process.env.RSS_API_KEY;
export const baseUrl = "http://fetchrss.com/api/v1/feed";
export const createPath = "/create";
export const listPath = "/list";
export const feedsFetchError = "Failed to fetch feeds";
export const feedFetchError = "Failed to fetch feed";
export const feedCreateError = "Failed to create feed";
export const notFoundError = "Feed not found";
export const mediumFeed = "medium";
export const mediumUrl = "https://medium.com/tag/web-development";
export const mediumFeedUrl =
  "http://fetchrss.com/rss/63664c2ae9f39504b07b24726366849e0fe77744505ea6b2.json";
export const cssTricksFeedUrl =
  "http://fetchrss.com/rss/63664c2ae9f39504b07b24726366c1397fc5fc680a4e9022.json";
export const devToFeedUrl =
  "http://fetchrss.com/rss/63664c2ae9f39504b07b2472636701d754c2bc5b8d627132.json";
export const normalizedNames: Record<string, string> = {
  medium: "Medium",
  cssTricks: "CSS Tricks",
  devTo: "Dev.to",
};
