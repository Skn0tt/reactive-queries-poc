import { Query } from "./Query";
import * as _ from "lodash";
import { map, distinctUntilChanged } from "rxjs/operators";

export const ActiveUsers: Query = {
  name: "ActiveUsers",
  query: readModel$ => readModel$.pipe(
    map(model => {
      const { messages } = model;
      const allMessages = _.values(messages);
      const allLikes = _.flatMap(allMessages, message => message.likes);
  
      const messageAuthors = allMessages.map(m => m.author);
      const likeAuthors = allLikes.map(m => m.author);
  
      return _.uniq([ ...messageAuthors, ...likeAuthors ]);
    }),
    distinctUntilChanged(_.isEqual),
  )
}