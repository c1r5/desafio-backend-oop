import { EventBusInterface, EventHandler, EventType, EventPayload } from "@/shared/domain/models/event/event-bus-interface";
import EventEmitter from "events";

export class LocalEventBus implements EventBusInterface {
    async publish<T extends EventPayload>(event: EventType, payload: T): Promise<void> {
        console.log(`Publishing event:\n`, payload);
        this.emitter.emit(event, payload);
    }
    async subscribe<T extends EventPayload>(event: EventType, handler: EventHandler<T>): Promise<void> {
        this.emitter.on(event, handler);
    }
    async unsubscribe<T extends EventPayload>(event: EventType, handler: EventHandler<T>): Promise<void> {
        this.emitter.off(event, handler);
    }

    private emitter = new EventEmitter();
}