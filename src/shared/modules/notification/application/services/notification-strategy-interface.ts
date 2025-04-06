export default interface NotificationStrategy {
    send_notification(): Promise<void>;
}