import { scan, distinctUntilChanged } from "rxjs/operators";
import { eventBroker$ } from "./eventBroker";
import * as uuidv5 from "uuid/v5";
import { RQEvent } from "./domainEvents";

interface Like {
  author: string;
  timestamp: Date;
}

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  author: string;
  likes: Like[];
}

export interface ReadModel {
  messages: Record<string, Message>;
}

const initialReadModel: ReadModel = {
  messages: {}
}

const messageIdNamespace = uuidv5("MESSAGE_ID", uuidv5.URL);

export function generateId(author: string, timestamp: number, nonce: number): string {
  return uuidv5(
    [author, timestamp, nonce].join(";"),
    messageIdNamespace
  );
}

function reducer(state: ReadModel, event: RQEvent): ReadModel {
  const { messages } = state;

  switch (event.type) {
    
    case "NEW_MESSAGE": {
      const { author, message, timestamp, nonce } = event;
      const messageId = generateId(author, +timestamp, nonce);

      const newMessage: Message = {
        author,
        timestamp,
        id: messageId,
        text: message,
        likes: [],
      }

      return {
        ...state,
        messages: {
          ...messages,
          [messageId]: newMessage
        },
      };
    }

    case "ADD_LIKE": {
      const { timestamp, author, messageId } = event;

      const newLike: Like = {
        author,
        timestamp
      }

      const message = messages[messageId];
      if (!message) {
        return state;
      }

      return {
        ...state,
        messages: {
          ...messages,
          [messageId]: {
            ...message,
            likes: [newLike, ...message.likes]
          }
        }
      }
    }

    case "REMOVE_LIKE": {
      const { author, messageId } = event;

      const message = messages[messageId];
      if (!message) {
        return state;
      }

      const updatedMessage: Message = {
        ...message,
        likes: message.likes.filter(like => {
          return like.author !== author;
        })
      }

      return {
        ...state,
        messages: {
          ...messages,
          [messageId]: updatedMessage
        }
      }
    }

  }
}

/**
 * This is a projection that's generated solely from the Events
 */
export const readModel$ = eventBroker$.pipe(
  scan<RQEvent, ReadModel>(
    reducer,
    initialReadModel
  ),
  distinctUntilChanged()
);