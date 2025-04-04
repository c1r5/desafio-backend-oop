import { inject, injectable } from "inversify";
import UserRepository from "@/shared/domain/repositories/user-repository";
import { TYPES } from "@/shared/infra/di/di-types";
import UserUseCases from "@/shared/application/usecases/user-usecases";
import { EventBusInterface } from "@/shared/domain/models/event/event-bus-interface";
import { UserCreateRequest } from "../../api/schemas/user-create-schemas";
import { UserUpdateRequest } from "../../api/schemas/user-update-schemas";

@injectable()
export default class UserUsecasesImpl implements UserUseCases {
    constructor(
        @inject(TYPES.UserRepository) private user_repository: UserRepository,
        @inject(TYPES.EventBus) private event_bus: EventBusInterface
    ) {
    }


    async create_user(value: UserCreateRequest): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async update_user(user_id: string, value: UserUpdateRequest): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async is_active(user_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    // async is_active(user_id: string): Promise<boolean> {
    //     const user_entity = await this.user_repository.orm.findOneBy({user_id: user_id})

    //     return user_entity?.status === 'active'
    // }

    // async update_user(id: string, entity: Partial<UserEntity>): Promise<void> {
    //     try {
    //         let entity_to_update = await this.user_repository.orm.update(id, entity);

    //         if (entity_to_update.affected && entity.email) {
    //             // await this.event_bus.publish<UserUpdatedPayload>('user.updated', {email: entity.email});
    //         }

    //         if (entity_to_update.affected && entity.phone) {
    //             // await this.event_bus.publish<UserUpdatedPayload>('user.updated', {phone: entity.phone});
    //         }
    //     } catch (e) {
    //         throw e
    //     }
    // }

    // async create_user(entity: Partial<UserEntity>): Promise<void> {
    //     try {
    //         let result = await this.user_repository.orm.save(entity);

    //         await this.event_bus.publish<UserCreatedPayload>(EVENT_TYPES.UserCreatedEvent, {email: result.email});
    //     } catch (e) {
    //         throw new CannotCreateUser((e as Error).message)
    //     }
    // }
}