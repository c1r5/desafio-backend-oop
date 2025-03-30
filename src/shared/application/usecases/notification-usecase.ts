export default interface NotificationUsecase {
    initialize(): Promise<void>;
    send<T>(options: T): Promise<void>;
}