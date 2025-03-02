import {DataSource} from "typeorm";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import UserEntity from "@/modules/users/domain/entities/user-entity";
import UserRepositoryImpl from "@/modules/users/infra/repositories/user-repository-impl";
import {fakerPT_BR} from "@faker-js/faker";
import {generate_cpf} from "@/helpers";

describe('User database operations', () => {
    let datasource: DataSource;
    let user_repository: UserRepository;
    let user_id: string;

    beforeAll(async () => {
        datasource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            entities: [UserEntity],
            synchronize: true,
        });
        await datasource.initialize(); // Inicializa a conexão
        user_repository = new UserRepositoryImpl(datasource)
    });

    afterAll(async () => {
        await datasource.destroy();
    });

    it('should create a user', async () => {
        let entity = user_repository.orm_repo.create({
            name: fakerPT_BR.person.fullName(),
            document: generate_cpf(),
            email: fakerPT_BR.internet.email(),
            phone: fakerPT_BR.phone.number(),
            password: fakerPT_BR.internet.password()
        });

        let saved_user = await user_repository.orm_repo.save(entity);

        user_id = saved_user.userId;

        expect(saved_user.document).toBe(entity.document);
    })

    it('should find and update a user', async () => {
        let entity = await user_repository.orm_repo.findOneBy({userId: user_id});

        if (!entity) {
            throw new Error("User not found");
        }

        let new_name = fakerPT_BR.person.fullName();

        entity.name = new_name

        await user_repository.orm_repo.update(entity.userId, entity);

        expect(entity.name).toBe(new_name)
    })

    it('should delete a user', async () => {
        let delete_user = await user_repository.orm_repo.delete(user_id)

        expect(delete_user.affected).toBe(1)
    })
})