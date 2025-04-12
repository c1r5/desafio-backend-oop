export interface NotificationOptions {
    from: string,
    to: string,
    subject?: string,
    text: string
}
export interface NotificationStrategy {
    options: NotificationOptions
    send_notification(): Promise<void>;
}