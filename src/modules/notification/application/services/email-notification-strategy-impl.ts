import {EmailNotificationStrategy} from "@/shared/application/services/email-notification-strategy";
import { EmailNotificationOptions } from "@/shared/domain/models/notification/email-notification-options";


export default class EmailNotificationStrategyImpl implements EmailNotificationStrategy {
    constructor(
        private readonly options: EmailNotificationOptions
    ) {
    }

    async send_notification(): Promise<void> {
        console.log(`[+] Sending email notification: ${this.options}`)
    }
}