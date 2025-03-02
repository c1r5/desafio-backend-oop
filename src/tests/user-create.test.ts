import {DataSource} from "typeorm";
import UserRepository from "../modules/users/domain/repositories/user-repository";
import UserRepositoryImpl from "../modules/users/infra/repositories/user-repository-impl";
import UserEntity from "@/modules/users/domain/entities/user-entity";
import TransactionEntity from "@/modules/transaction/domain/entities/transaction-entity";

describe('user insertion test', () => {
    let datasource: DataSource;
    let user_repository: UserRepository;
    let user_id: string;

    // Configuração antes de cada teste
    beforeAll(async () => {
        datasource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            entities: [
                UserEntity,
                TransactionEntity
            ],
            synchronize: true,
        });
        await datasource.initialize(); // Inicializa a conexão
        user_repository = new UserRepositoryImpl(datasource)
    });

    // Limpeza após cada teste
    afterAll(async () => {
        await datasource.destroy(); // Fecha a conexão e limpa o banco em memória
    });

    it('should save a new user in database', async () => {
        let created_user = await user_repository.orm_repo.save({
            name: "John Doe",
            document: "12345678901",
            email: "john.doe@example.com",
            phone: "+55 11 9999-9999",
            password: "123456"
        })

        user_id = created_user.userId

        expect(created_user).toHaveProperty(
            'userId'
        )
    })

    it('should find a user by id', async () => {
        let find_user = await user_repository.orm_repo.findOneBy({userId: user_id})
        expect(find_user?.userId).toBe(user_id)
    })
})
