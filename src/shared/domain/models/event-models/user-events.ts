import {EventPayload} from "./event-payload";

export interface UserCreatedPayload extends EventPayload {
    email: string,
}

export interface UserUpdatedPayload extends EventPayload {
    email?: string,
    phone?: string
}