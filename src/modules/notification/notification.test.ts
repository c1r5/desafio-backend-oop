import {EmailNotification} from "@/shared/modules/notification/application/services/email-notification-strategy";
import EmailNotificationImpl from "@/modules/notification/application/services/email-notification-impl";

describe('Notification Module', () => {
    let email_notification: EmailNotification;

    beforeAll(async () => {
        email_notification = new EmailNotificationImpl({
            to: "teste@email.com",
            subject: "Test Subject",
            body: "Test Body"
        })
    })

    it('should send email notification', async () => {
        await email_notification.send_notification();
        expect(email_notification).toBeDefined();
    })
})