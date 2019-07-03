import * as _ from "lodash";
import Queries from "./queries";
import { logQuery } from "./logQuery";
import { readModel$ } from "./readModel";
import * as MockEvents from "./mockEvents";
import { eventBroker$ } from "./eventBroker";

Queries.forEach(q => {
  const { query, name } = q;
  logQuery(query(readModel$), name);
});

MockEvents.mock(eventBroker$, 2000);
