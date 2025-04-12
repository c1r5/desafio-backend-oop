import { NotificationOptions, NotificationStrategy } from "@/shared/modules/notification/notification-strategy-interface";
import MailerClient from "../../../shared/application/services/mailer-client";

export class EmailNotificationStrategyImpl implements NotificationStrategy {
    constructor(
        public readonly options: NotificationOptions,
        private mailer_client: MailerClient
    ) { }

    async send_notification(): Promise<void> {
        this.mailer_client.send_email(this.options)
    }
}