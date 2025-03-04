import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import UserEntity, {UserID} from "@/modules/users/domain/entities/user-entity";


export default class UserUseCasesMock implements UserUseCases {
    private user_repository: UserRepository;

    constructor(
        user_repository: UserRepository
    ) {
        this.user_repository = user_repository;
    }

    async authenticate(user: Partial<UserEntity>): Promise<UserEntity | null> {
        return this.user_repository.orm_repo.findOneBy([
            {email: user.email, password: user.password},
            {document: user.document, password: user.password}
        ])
    }

    async authorize(userId: string): Promise<boolean> {
        const user_entity = await this.user_repository.orm_repo.findOneBy({userId: userId});
        return user_entity?.status === 'active';
    }

    async get_user_by_id(id: string): Promise<UserEntity | null> {
        return await this.user_repository.orm_repo.findOneBy({userId: id})
    }

    async create_user(user: Partial<UserEntity>): Promise<UserID> {
        let result = await this.user_repository.orm_repo.save(user);
        return result.userId;
    }
}