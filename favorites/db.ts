import Dexie from "dexie";

export interface IFeed {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

export interface ITool {
  id: string;
  component: string;
}

export default class Db extends Dexie {
  feed!: Dexie.Table<IFeed, string>;
  tool!: Dexie.Table<ITool, string>;

  constructor() {
    super("Favorites");

    this.version(2).stores({
      feed: "id, title, link, description, pubDate",
      tool: "id, component",
    });
  }
}
