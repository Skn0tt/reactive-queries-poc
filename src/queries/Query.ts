import { Observable } from "rxjs";
import { ReadModel } from "../readModel";

export interface Query {
  name: string;
  query: (readModel$: Observable<ReadModel>) => Observable<any>
}