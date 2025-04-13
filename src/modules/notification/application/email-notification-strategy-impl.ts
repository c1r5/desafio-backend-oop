import { MailerClientStrategy } from "@/shared/modules/notification/mailer-client-strategy";
import { NotificationOptions, NotificationStrategy } from "@/shared/modules/notification/notification-strategy-interface";

export class EmailNotificationStrategyImpl implements NotificationStrategy {
    constructor(
        public readonly options: NotificationOptions,
        private mailer_client: MailerClientStrategy
    ) { }

    async send_notification(): Promise<void> {
        this.mailer_client.send({
            to: this.options.to,
            subject: String(this.options.subject),
            body: this.options.text
        })
    }
}