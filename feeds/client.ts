import UrlBuilder from "../utils/url-builder";
import {
  baseUrl,
  key,
  createPath,
  listPath,
  feedCreateError,
} from "./constants";

export interface Feed {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

export interface FeedResponse {
  success: boolean;
  feeds: Feed[];
}

export interface FeedQuery {
  id: string;
  rss_url: string;
  title: string;
  src_url: string;
}

export interface ErrorResponse {
  success: boolean;
  error: string;
}

type Response = Promise<FeedResponse | ErrorResponse>;

interface CreateFeedOptions {
  url: string;
  newsSelector: string;
  titleSelector: string;
  contentSelector: string;
  picSelector?: string;
  dateSelector?: string;
  authorSelector?: string;
  linkSelector?: string;
  picSrcParam?: string;
  dateFormatParam?: string;
}

type CreateFeed = (options: CreateFeedOptions) => Response;

type GetFeed = (id: string) => Promise<FeedQuery | ErrorResponse>;

export const queryFeeds = async () => {
  try {
    const url = UrlBuilder.Builder.withBaseUrl(baseUrl)
      .withPathname(listPath)
      .withQueryParams({ auth: `${key}` })
      .build();

    const response = await fetch(url.href);

    if (!response.ok) throw new Error(response.statusText);

    const data: { feeds: FeedQuery[] } = await response.json();
    return data;
  } catch (e) {
    const error = e as Error;
    console.error(error.message);

    return { feeds: [] };
  }
};

export const createFeed: CreateFeed = async (options) => {
  const parserReadyOptions = Object.fromEntries(
    Object.entries(options).map(([key, value]) => {
      if (key.match(/[A-Z]/)) {
        const newKey: string = key.replace(
          /[A-Z]/,
          (match) => `-${match.toLowerCase()}`
        );
        return [newKey, value];
      }

      return [key, value];
    })
  );

  try {
    const url = UrlBuilder.Builder.withBaseUrl(baseUrl)
      .withPathname(createPath)
      .withQueryParams({ auth: `${key}`, ...parserReadyOptions })
      .build();

    const response = await fetch(url.href);

    if (!response.ok) throw new Error(response.statusText);

    const data: FeedResponse | ErrorResponse = await response.json();

    if (!data.success) throw new Error(feedCreateError);

    return data;
  } catch (e) {
    const error = e as Error;
    console.error(error.message);

    return {
      success: false,
      error: error.message,
    };
  }
};

export const queryAllFeeds = async <T extends Record<string, string>>(
  feeds: T
) => {
  try {
    let rss: { [P in keyof T]: Feed[] };

    const promises = Object.entries(feeds).map(async ([key, value]) => {
      const response = await fetch(value);

      if (!response.ok) throw new Error(response.statusText);

      const data = ((await response.json()) as any).items;

      return { [key]: data };
    });

    const results = await Promise.all(promises);

    rss = Object.assign({}, ...results);

    return rss;
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
  }
};
