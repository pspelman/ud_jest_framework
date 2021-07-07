import { basicURLParse } from "whatwg-url";
import { UrlWithParsedQuery, parse } from "url"
// import "whatwg-url";

export class Utils {

  public static parseUrl(url: string): UrlWithParsedQuery {
    if (!url) throw new Error('Empty URL')
    return parse(url, true);
    // console.log(`trying to parse: `, url);
    // let parsed = basicURLParse(url)
    // console.log(`result: `, parsed)
    // return parsed;
  }

  public static toUpperCase(arg: string) {
    return arg.toUpperCase();
  }
}
