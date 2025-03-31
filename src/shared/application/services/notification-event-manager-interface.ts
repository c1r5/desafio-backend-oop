import NotificationStrategyInterface from "@/shared/application/services/notification-strategy-interface";

export default interface NotificationEventManagerInterface {
    initialize(): Promise<void>;
    notification_manager(notification_strategy: NotificationStrategyInterface): Promise<void>;
}