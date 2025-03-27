import {inject, injectable} from "inversify";
import UserRepository from "@/shared/domain/repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/shared/application/usecases/user-usecases";
import UserEntity from "@/modules/users/domain/entities/user-entity";
import {EventBusInterface} from "@/shared/domain/models/event-models/event-bus-interface";
import {CannotCreateUser, UserAlreadyExist} from "@/modules/users/application/errors/create-errors";
import {QueryFailedError} from "typeorm";
import {UserCreatedPayload} from "@/shared/domain/models/event-models/user-events";

@injectable()
export default class UserUsecasesImpl implements UserUseCases {
    private user_repository: UserRepository;

    constructor(
        @inject(TYPES.UserRepository) user_repository: UserRepository,
        @inject(TYPES.EventBus) private event_bus: EventBusInterface
    ) {
        this.user_repository = user_repository;
    }

    async is_active(user_id: string): Promise<boolean> {
        const user_entity = await this.user_repository.orm.findOneBy({user_id: user_id})

        return user_entity?.status === 'active'
    }

    async update_user(id: string, entity: Partial<UserEntity>): Promise<void> {
        let entity_to_update = await this.user_repository.orm.update(id, entity);

        if (entity_to_update.affected) {
            //
        }
    }

    async create_user(entity: Partial<UserEntity>): Promise<void> {
        try {
            let result = await this.user_repository.orm.save(entity);

            await this.event_bus.publish<UserCreatedPayload>('user.created', {email: result.email});
        } catch (e) {
            if (e instanceof QueryFailedError) {
                switch (e.driverError.errno) {
                    case 19:
                        throw new UserAlreadyExist()
                    default:
                        throw new CannotCreateUser()
                }
            }

            throw new CannotCreateUser()
        }
    }
}