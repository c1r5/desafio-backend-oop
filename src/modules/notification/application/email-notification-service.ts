import NotificationService from "@/modules/notification/domain/services/notification-service";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {EventBusInterface} from "@/shared/domain/models/event/event-bus-interface";
import {UserCreatedPayload} from "@/shared/domain/models/event/user-events";

@injectable()
export default class EmailNotificationService implements NotificationService {
    constructor(
        @inject(TYPES.EventBus) private eventbus: EventBusInterface
    ) {
    }

    async init(): Promise<void> {
        await this.eventbus.subscribe<UserCreatedPayload>('user.created', this.send)
        console.log('[+] Email notification service initialized')
    }

    async send(event: UserCreatedPayload): Promise<void> {
        console.log(event)
    }
}