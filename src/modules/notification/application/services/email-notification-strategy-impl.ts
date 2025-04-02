import {EmailNotificationStrategy} from "@/shared/application/services/email-notification-strategy";
import { EmailNotificationOptions } from "@/shared/domain/models/notification/email-notification-options";
import {send_email} from "@/modules/notification/http/clients/mailer-client";


export default class EmailNotificationStrategyImpl implements EmailNotificationStrategy {
    constructor(
        private readonly options: EmailNotificationOptions
    ) {}

    async send_notification(): Promise<void> {
        await send_email(this.options)
    }
}