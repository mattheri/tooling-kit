import Db, { IFavorite, IHtml } from "./db";
import { nanoid } from "nanoid";

export default class Favorite implements IFavorite {
  private readonly _db = new Db();
  id: string;
  type: string;
  persistentLink: string;
  html: IHtml | null = null;

  constructor(type: string, persistentLink: string, id?: string) {
    this.id = id || nanoid();
    this.type = type;
    this.persistentLink = persistentLink;
  }

  loadHtml() {
    return Promise.all([
      this._db.html
        .where("favorite")
        .equals(this.id)
        .toArray((html) => (this.html = html[0]))
        .then(() => this),
    ]);
  }

  save() {
    return this._db.transaction("rw", this._db.favorite, this._db.html, () => {
      if (this.html)
        this._db.html.put(this.html).then((result) => {
          this._db.html
            .where("favorite")
            .equals(this.id)
            .and((html) => html.id !== result)
            .delete();

          this._db.favorite.put(
            new Favorite(this.type, this.persistentLink, this.id)
          );
        });
    });
  }
}
