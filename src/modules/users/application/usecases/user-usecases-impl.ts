import { inject, injectable } from "inversify";
import UserRepository from "@/shared/domain/repositories/user-repository";
import { TYPES } from "@/shared/infra/di/di-types";
import UserUseCases from "@/shared/application/usecases/user-usecases";
import { EventBusInterface } from "@/shared/domain/models/event/event-bus-interface";
import { UserCreateRequest } from "../../api/schemas/user-create-schemas";
import { UserUpdateRequest } from "../../api/schemas/user-update-schemas";
import { EVENT_TYPES } from "@/shared/domain/models/event/event-types";
import { UserCreatedPayload, UserUpdatedPayload } from "@/shared/domain/models/event/user-event-payloads";
import { CannotCreateUser } from "../errors/create-errors";

@injectable()
export default class UserUsecasesImpl implements UserUseCases {
    constructor(
        @inject(TYPES.UserRepository) private user_repository: UserRepository,
        @inject(TYPES.EventBus) private event_bus: EventBusInterface
    ) {
    }


    async create_user(value: UserCreateRequest): Promise<void> {
        try {
            const create = await this.user_repository.create_user(value);
            if (create) {
                await this.event_bus.publish<UserCreatedPayload>(EVENT_TYPES.UserCreatedEvent, { email: create.email });
            }
        } catch (error) {
            console.error("Error creating user:", error);
            throw new CannotCreateUser((error as Error).message);
        }
    }

    async update_user(user_id: string, value: UserUpdateRequest): Promise<void> {
        const update = await this.user_repository.update_user(user_id, value);

        if (update && value.email) {
            await this.event_bus.publish<UserUpdatedPayload>(EVENT_TYPES.UserUpdatedEmailEvent, { email: value.email });
        }

        if (update && value.phone) {
            await this.event_bus.publish<UserUpdatedPayload>(EVENT_TYPES.UserUpdatedPhoneEvent, { phone: value.phone });
        }

        if (update && value.password) {
            await this.event_bus.publish<UserUpdatedPayload>(EVENT_TYPES.UserUpdatedPasswordEvent, { password: value.password });
        }
        
    }

    async is_active(user_id: string): Promise<boolean> {
        const user_entity = await this.user_repository.orm.findOneBy({ user_id: user_id })
        return user_entity?.status === 'active'
    }
}