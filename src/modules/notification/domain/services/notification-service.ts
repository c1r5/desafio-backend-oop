import {UserCreatedPayload} from "@/shared/domain/models/event-models/user-events";

export default interface NotificationService {
    init(): Promise<void>;

    send(event: UserCreatedPayload): Promise<void>
}