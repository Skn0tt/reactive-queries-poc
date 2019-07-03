import { RQEvent } from "./domainEvents";
import { generateId } from "./readModel";
import { Subject } from "rxjs";

const events: RQEvent[] = [
  {
    type: "NEW_MESSAGE",
    author: "Max Mustermann",
    timestamp: new Date(12345),
    message: "Hello World!",
    nonce: 12
  },
  {
    type: "ADD_LIKE",
    author: "MaxFanboy1337",
    messageId: generateId("Max Mustermann", +new Date(12345), 12),
    timestamp: new Date(12346)
  },
  {
    type: "ADD_LIKE",
    author: "MaxFanboy1337",
    messageId: "unknownId",
    timestamp: new Date(12347)
  }
]

const waitFor = (n: number) => new Promise<void>(resolve => {
  setTimeout(resolve, n);
})

export async function mock(broker: Subject<RQEvent>, interval: number) {
  for (const event of events) {
    console.log("Next Event")
    broker.next(event);
    await waitFor(interval);
  }
}