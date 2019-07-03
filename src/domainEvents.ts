interface BaseEvent<T extends string> {
  type: T;
}

export interface NewMessageEvent extends BaseEvent<"NEW_MESSAGE"> {
  author: string;
  message: string;
  timestamp: Date;
  nonce: number;
}

export interface AddLikeEvent extends BaseEvent<"ADD_LIKE"> {
  messageId: string;
  author: string;
  timestamp: Date;
}

export interface RemoveLikeEvent extends BaseEvent<"REMOVE_LIKE"> {
  messageId: string;
  author: string;
}

export type RQEvent = NewMessageEvent | AddLikeEvent | RemoveLikeEvent;