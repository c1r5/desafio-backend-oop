import {EventPayload} from "@/shared/domain/models/event/event-payload";

export interface EventBusInterface {
    publish<T extends EventPayload>(event: string, payload: T): Promise<void>;

    subscribe<T extends EventPayload>(event: string, handler: (payload: T) => void): Promise<void>;
}