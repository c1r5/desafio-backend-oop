import { NotificationStrategy } from "./notification-strategy-interface";

export default interface NotificationUsecaseInterface {
    send(strategy: NotificationStrategy): Promise<void>;
}