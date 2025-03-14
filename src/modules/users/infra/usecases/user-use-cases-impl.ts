import {inject, injectable} from "inversify";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/application/usecases/user-usecases";
import UserEntity from "@/modules/users/domain/entities/user-entity";

@injectable()
export default class UserUseCasesImpl implements UserUseCases {
    private user_repository: UserRepository;

    constructor(
        @inject(TYPES.UserRepository) user_repository: UserRepository
    ) {
        this.user_repository = user_repository;
    }

    async is_active(user_id: string): Promise<boolean> {
        const user_entity = await this.user_repository.orm.findOneBy({user_id: user_id})

        return !!user_entity
    }

    async update_user(id: string, entity: Partial<UserEntity>): Promise<UserEntity | null> {
        let entity_to_update = await this.user_repository.orm.update(id, entity);

        if (entity_to_update.affected) {
            return await this.user_repository.orm.findOneBy({user_id: id})
        }

        return null
    }

    async create_user(entity: Partial<UserEntity>): Promise<string> {
        let result = await this.user_repository.orm.save(entity);
        return result.user_id;
    }

    async get_user_by_id(id: string): Promise<UserEntity | null> {
        return await this.user_repository.orm.findOneBy({user_id: id})
    }
}