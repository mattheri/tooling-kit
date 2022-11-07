import Dexie from "dexie";

export interface IFavorite {
  id: string;
  type: string;
  persistentLink: string;
}

export interface IHtml {
  id: string;
  html: string;
  favorite: string;
}

export interface IFeed {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  favorite: string;
}

export default class Db extends Dexie {
  favorite!: Dexie.Table<IFavorite, string>;
  html!: Dexie.Table<IHtml, string>;
  feed!: Dexie.Table<IFeed, string>;

  constructor() {
    super("Favorites");

    this.version(1).stores({
      favorite: "id, type, persistentLink",
      html: "id, html, favorite",
      feed: "id, title, link, description, pubDate",
    });
  }
}
