import {EventPayload} from "@/shared/domain/models/event/event-bus-interface";

export type UserCreatedPayload = EventPayload & {
    email?: string
    phone?: string
}