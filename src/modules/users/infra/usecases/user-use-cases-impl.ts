import {inject, injectable} from "inversify";
import UserRepository from "../../domain/repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import UserEntity, {UserID} from "../../domain/entities/user-entity";

@injectable()
export default class UserUseCasesImpl implements UserUseCases {
    private user_repository: UserRepository;

    constructor(
        @inject(TYPES.UserRepository) user_repository: UserRepository
    ) {
        this.user_repository = user_repository;
    }

    async create_user(entity: Partial<UserEntity>): Promise<UserID> {
        let result = await this.user_repository.orm_repo.save(entity);
        return result.userId;
    }

    authenticate(user: Partial<UserEntity>): Promise<UserEntity | null> {
        return this.user_repository.orm_repo.findOneBy([
            {email: user.email, password: user.password},
            {document: user.document, password: user.password}
        ])
    }

    async get_user_by_id(id: string): Promise<UserEntity | null> {
        return await this.user_repository.orm_repo.findOneBy({userId: id})
    }
}