export default interface NotificationStrategyInterface {
    send_notification(): Promise<void>;
}