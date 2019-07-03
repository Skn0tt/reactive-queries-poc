import { Observable } from "rxjs";
import * as util from "util";

export function logQuery(query: Observable<any>, tag: string) {
  query.subscribe(
    value => {
      console.log(
        `${tag}: `,
        util.inspect(value, { colors: true, depth: 10 })
      );
    }
  )
}