export const EVENT_TYPES = {
    UserCreatedEvent: Symbol.for("user.created"),
    UserUpdatedEmailEvent: Symbol.for("user.updated.email"),
    UserUpdatedPhoneEvent: Symbol.for("user.updated.phone"),
    UserUpdatedPasswordEvent: Symbol.for("user.updated.password"),
}