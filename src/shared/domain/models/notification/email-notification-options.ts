import NotificationOptions from "@/shared/domain/models/notification/notification-options";

export interface EmailNotificationOptions extends NotificationOptions{
    subject: string;
    body: string;
    cc?: string[];
    bcc?: string[];
    attachments?: EmailAttachment[];
}

interface EmailAttachment {
    filename: string;
    content: Buffer | string;
    contentType: string;
}

