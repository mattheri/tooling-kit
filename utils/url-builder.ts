import { URLSearchParams } from "url";
import qs from "qs";

type Params = Record<string, string | string[] | URLSearchParams>;

class UrlBuilder {
  private _url: URL;

  constructor(url: URL) {
    this._url = url;
  }

  static Builder = class {
    private static baseUrl: string;
    private static pathName: string;
    private static queryParams: string;

    public static withBaseUrl(baseUrl: string) {
      this.baseUrl = baseUrl;
      return this;
    }

    public static withPathname(pathname: string) {
      this.pathName = pathname;
      return this;
    }

    public static withQueryParams(queryParams: Params) {
      this.queryParams = qs.stringify(queryParams, { arrayFormat: "comma" });
      return this;
    }

    private static _buildUrl() {
      const url = new URL(this.baseUrl);
      url.pathname = `${url.pathname}/${this.pathName}`;
      url.search = new URLSearchParams(this.queryParams).toString();
      return url;
    }

    public static build() {
      return new UrlBuilder(UrlBuilder.Builder._buildUrl());
    }
  };

  get href() {
    return this._url.toString();
  }

  get pathname() {
    return this._url.pathname;
  }

  get search() {
    return this._url.search;
  }

  get params() {
    return this._url.searchParams;
  }
}

export default UrlBuilder;
