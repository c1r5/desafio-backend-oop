import {inject, injectable} from "inversify";
import UserRepository from "../../domain/repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import UserEntity, {UserID, UserType} from "../../domain/entities/user-entity";

@injectable()
export default class UserUseCasesImpl implements UserUseCases {
    private user_repository: UserRepository;

    constructor(
        @inject(TYPES.UserRepository) user_repository: UserRepository
    ) {
        this.user_repository = user_repository;
    }

    async get_user_type_by_id(id: UserID): Promise<UserType | null> {
        return (
            await this.user_repository.orm.findOneBy({
                userId: id
            })
        )?.type ?? null
    }

    async is_active(user_id: string): Promise<boolean> {
        const user_entity = await this.user_repository.orm.findOneBy({userId: user_id})

        return !!user_entity
    }

    async update_user(id: UserID, entity: Partial<UserEntity>): Promise<UserEntity | null> {
        let entity_to_update = await this.user_repository.orm.update(id, entity);

        if (entity_to_update.affected) {
            return await this.user_repository.orm.findOneBy({userId: id})
        }

        return null
    }

    async create_user(entity: Partial<UserEntity>): Promise<UserID> {
        let result = await this.user_repository.orm.save(entity);
        return result.userId;
    }

    async get_user_by_id(id: string): Promise<UserEntity | null> {
        return await this.user_repository.orm.findOneBy({userId: id})
    }
}