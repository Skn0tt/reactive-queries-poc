import { ReplaySubject } from "rxjs";
import { RQEvent } from "./domainEvents";

/**
 * This could be Kafka
 */
export const eventBroker$ = new ReplaySubject<RQEvent>();