

export interface EventPayload {
    event_id?: string;
}
export type EventHandler<T extends EventPayload> = (payload: T) => Promise<void>;

export type EventType = symbol

export interface EventBusInterface {
    publish<T extends EventPayload>(event: EventType, payload: T): Promise<void>;
    subscribe<T extends EventPayload>(event: EventType, handler: EventHandler<T>): Promise<void>;
    unsubscribe<T extends EventPayload>(event: EventType, handler: EventHandler<T>): Promise<void>;
}