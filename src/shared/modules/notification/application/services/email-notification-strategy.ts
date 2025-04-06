import NotificationStrategy from "@/shared/modules/notification/application/services/notification-strategy-interface";
import { EmailNotificationOptions } from "../email-notification-options";

export interface EmailNotification extends NotificationStrategy {
  options: EmailNotificationOptions;
 }