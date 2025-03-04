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

    create_user(entity: Partial<UserEntity>): Promise<UserID> {
        throw new Error("Method not implemented.");
    }

    authenticate(user: Partial<UserEntity>): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }

    authorize(userId: UserID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    get_user_by_id(id: string): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }
}