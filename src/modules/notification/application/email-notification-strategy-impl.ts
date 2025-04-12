import { EmailNotificationStrategy } from "@/shared/modules/notification/application/services/email-notification-strategy";
import { NotificationOptions } from "@/shared/modules/notification/application/services/notification-strategy-interface";
import { send_email } from "../http/clients/mailer-mock";

export class EmailNotificationStrategyImpl implements EmailNotificationStrategy {
    constructor(
        public readonly options: NotificationOptions
    ) {}

    async send_notification(): Promise<void> {
        send_email(this.options)
    }
}