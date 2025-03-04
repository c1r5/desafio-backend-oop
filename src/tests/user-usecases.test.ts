import {fakerPT_BR} from "@faker-js/faker";
import {generate_cpf} from "@/helpers";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import UserEntity from "@/modules/users/domain/entities/user-entity";
import {DataSource} from "typeorm";
import {container} from "@/shared/infra/di/di-container";
import {TYPES} from "@/shared/infra/di/di-types";
import {AppDataSource} from "@/shared/infra/datasources/app-data-source";

describe('User UseCases Operations', () => {
    let new_user: Partial<UserEntity> = {
        name: fakerPT_BR.person.fullName(),
        email: fakerPT_BR.internet.email(),
        phone: fakerPT_BR.phone.number(),
        type: 'pf',
        document: generate_cpf(),
        password: fakerPT_BR.internet.password()
    };

    let user_id: string;

    let user_usecases: UserUseCases
    let datasource: DataSource

    beforeAll(async () => {
        datasource = await AppDataSource.initialize()
        user_usecases = container.get<UserUseCases>(TYPES.UserUseCases)
    });

    afterAll(async () => {
        await datasource.destroy()
    });

    test('should create a user', async () => {
        user_id = await user_usecases.create_user(new_user)

        expect(user_id).toBeTruthy()
    })

    test('should authenticate a user', async () => {
        let authentication = await user_usecases.authenticate_user({
            email: "Suelen62@yahoo.com",
            password: "j3sIo62gAqqw9lP"
        })

        expect(authentication).toBeTruthy()
    })
})