import {fakerPT_BR} from "@faker-js/faker";
import {generate_cpf} from "@/helpers";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import UserEntity from "@/modules/users/domain/entities/user-entity";
import {MockDatasource} from "@/shared/infra/datasources/mock-datasource";
import {DataSource} from "typeorm";
import UserRepositoryMock from "@/modules/users/infra/repositories/user-repository-mock";
import UserUseCasesMock from "@/modules/users/infra/usecases/user-usecases-mock";

describe('User Repository Operations', () => {
    let new_user: Partial<UserEntity> = {
        name: fakerPT_BR.person.fullName(),
        email: fakerPT_BR.internet.email(),
        phone: fakerPT_BR.phone.number(),
        type: 'pf',
        document: generate_cpf(),
        password: fakerPT_BR.internet.password()
    };

    let user_id: string;

    let user_repository: UserRepository
    let user_usecases: UserUseCases
    let datasource: DataSource

    beforeAll(async () => {
        datasource = await MockDatasource.initialize()
        user_repository = new UserRepositoryMock(datasource)
        user_usecases = new UserUseCasesMock(user_repository)
    });

    afterAll(async () => {
        await datasource.destroy()
    });

    test('should create a user', async () => {
        user_id = await user_usecases.create_user(new_user)

        expect(user_id).toBeTruthy()
    })

    test('should authenticate a user', async () => {
        let authentication = await user_usecases.authenticate({
            email: new_user.email,
            password: new_user.password
        })

        expect(authentication).toBeTruthy()
    })

    test('should authorize a user', async () => {
        let authorized = await user_usecases.authorize(user_id)

        expect(authorized).toBeTruthy()
    })
})