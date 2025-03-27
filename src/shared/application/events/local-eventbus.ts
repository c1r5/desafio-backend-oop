import {EventBusInterface} from "@/shared/domain/models/event/event-bus-interface";
import EventEmitter from "events";
import {EventPayload} from "@/shared/domain/models/event/event-payload";

export class LocalEventBus implements EventBusInterface {
    private emitter = new EventEmitter();

    async publish<T extends EventPayload>(event: string, payload: T): Promise<void> {
        payload.event_id = crypto.randomUUID()
        this.emitter.emit(event, payload);
    }

    async subscribe<T>(event: string, handler: (payload: T) => void): Promise<void> {
        this.emitter.on(event, handler);
    }
}