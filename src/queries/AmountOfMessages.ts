import { Query } from "./Query";
import { map, distinctUntilChanged } from "rxjs/operators";

export const AmountOfMessages: Query = {
  name: "Amount of Messages",
  query: readModel$ => readModel$.pipe(
    map(model => {
      return Object.keys(model.messages).length;
    }),
    distinctUntilChanged()
  )
}