import Db, { IHtml } from "./db";
import { nanoid } from "nanoid";

export default class Html implements IHtml {
  private readonly _db = new Db();
  id: string;
  html: string;
  favorite: string;

  constructor(html: string, favorite: string, id?: string) {
    this.id = id || nanoid();
    this.html = html;
    this.favorite = favorite;
  }

  save(html: string) {
    return this._db.transaction("rw", this._db.html, () => {
      this._db.html.put(new Html(html, this.favorite, this.id));
    });
  }
}
