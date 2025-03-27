import {EventPayload} from "./event-payload";

export interface UserCreatedPayload extends EventPayload {
    email: string,
}

