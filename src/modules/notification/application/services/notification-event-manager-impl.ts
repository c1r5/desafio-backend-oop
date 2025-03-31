import NotificationEventManagerInterface from "@/shared/application/services/notification-event-manager-interface";
import {EventBusInterface} from "@/shared/domain/models/event/event-bus-interface";
import {TYPES} from "@/shared/infra/di/di-types";
import {inject, injectable} from "inversify";
import {EVENT_TYPES} from "@/shared/domain/models/event/event-types";
import {UserCreatedPayload} from "@/shared/domain/models/event/user-event-payloads";
import NotificationStrategyInterface from "@/shared/application/services/notification-strategy-interface";
import EmailNotificationStrategyImpl
    from "@/modules/notification/application/services/email-notification-strategy-impl";

@injectable()
export default class NotificationEventManagerImpl implements NotificationEventManagerInterface {
    constructor(
        @inject(TYPES.EventBus) private event_bus: EventBusInterface
    ) {
    }

    async notification_manager(notification_strategy: NotificationStrategyInterface): Promise<void> {
        await notification_strategy.send_notification()
    }

    async initialize(): Promise<void> {
        console.log('[+] Initialize Notification event manager');
        await this.event_bus.subscribe<UserCreatedPayload>(EVENT_TYPES.UserCreatedEvent, async payload => {
            await this.notification_manager(new EmailNotificationStrategyImpl({
                subject: "Verifique seu Email",
                body: "codigo: 11111",
                to: payload.email
            }))
        })
    }
}