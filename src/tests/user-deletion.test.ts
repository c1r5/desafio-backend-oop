import {DataSource} from "typeorm";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import UserRepositoryImpl from "@/modules/users/infra/repositories/user-repository-impl";
import {fakerPT_BR} from "@faker-js/faker";
import {generate_cpf} from "@/helpers";
import UserEntity from "@/modules/users/domain/entities/user-entity";

describe('User deletion', () => {
    let datasource: DataSource
    let user_repository: UserRepository

    beforeAll(async () => {
        datasource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            entities: [ UserEntity ],
            synchronize: true,
        });
        await datasource.initialize()
        user_repository = new UserRepositoryImpl(datasource)
    })

    afterAll(async () => {
        await datasource.destroy()
    })

    it('should create and delete a user', async () => {
        let create_user = await user_repository.orm_repo.save({
            name: fakerPT_BR.person.fullName(),
            document: generate_cpf(),
            email: fakerPT_BR.internet.email(),
            phone: fakerPT_BR.phone.number(),
            password: fakerPT_BR.internet.password()
        })

        let delete_user = await user_repository.orm_repo.delete(create_user.userId)

        expect(delete_user.affected).toBe(1)
    })
})