import NotificationStrategy from "@/shared/modules/notification/application/services/notification-strategy-interface";
import EventManager from "@/shared/application/events/event-manager";

export interface NotificationUsecases extends EventManager{
    send_notification(notification_strategy: NotificationStrategy): Promise<void>;
}