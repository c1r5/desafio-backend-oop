export interface EmailNotificationOptions {
    to: string | string[];
    subject: string;
    body: string;
    from?: string;
    cc?: string[];
    bcc?: string[];
    attachments?: EmailAttachment[];
}

interface EmailAttachment {
    filename: string;
    content: Buffer | string;
    contentType: string;
}
