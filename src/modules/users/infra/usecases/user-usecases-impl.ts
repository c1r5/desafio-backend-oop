import {inject, injectable} from "inversify";
import UserRepository from "../../domain/repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import UserEntity, {UserID} from "../../domain/entities/user-entity";

@injectable()
export default class UserUsecasesImpl implements UserUseCases {
    private user_repository: UserRepository;

    constructor(
        @inject(TYPES.UserRepository) user_repository: UserRepository
    ) {
        this.user_repository = user_repository;
    }

    async update_user(id: UserID, entity: Partial<UserEntity>): Promise<UserEntity | null> {
        let entity_to_update = await this.user_repository.orm_repo.update(id, entity);

        if (entity_to_update.affected) {
            return await this.user_repository.orm_repo.findOneBy({userId: id})
        }

        return null
    }

    async create_user(entity: Partial<UserEntity>): Promise<UserID> {
        let result = await this.user_repository.orm_repo.save(entity);
        return result.userId;
    }

    authenticate_user(user: Partial<UserEntity>): Promise<UserEntity | null> {
        return this.user_repository.orm_repo.findOneBy([
            {email: user.email, password: user.password},
            {document: user.document, password: user.password}
        ])
    }

    async get_user_by_id(id: string): Promise<UserEntity | null> {
        return await this.user_repository.orm_repo.findOneBy({userId: id})
    }
}