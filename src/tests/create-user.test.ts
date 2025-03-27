import {RawServerDefault} from "fastify";
import {container} from "@/shared/infra/di/di-container";
import Application from "@/app";
import {TYPES} from "@/shared/infra/di/di-types";
import {DataSource} from "typeorm";
import request from "supertest";
import {fakerPT_BR} from "@faker-js/faker";
import {generate_cnpj} from "@/shared/application/helpers/cnpj";

describe('crate user test suite', () => {
    let mocked_server: RawServerDefault;
    let datasource: DataSource;

    beforeAll(async () => {
        const _datasource: DataSource = container.get(TYPES.DataSource)
        datasource = await _datasource.initialize();

        const app: Application = container.get(TYPES.ApplicationServer);

        app
            .register_middleware(container.get(TYPES.VerifyJWTMiddleware))
            .register_middleware(container.get(TYPES.VerifySessionMiddleware))
            .register_middleware(container.get(TYPES.VerifyUserMiddleware))
            .register_middleware(container.get(TYPES.VerifyUserTransferAbilityMiddleware))
            .register_controller(container.get(TYPES.UserController))

        mocked_server = await app.mocked();
    });

    afterAll(async () => {
        await datasource.destroy()
    });

    it('should create a user and return 201', async () => {
        const create_user = await request(mocked_server)
            .post('/api/v1/user/create')
            .send({
                name: fakerPT_BR.person.fullName(),
                document: generate_cnpj(),
                email: fakerPT_BR.internet.email(),
                phone: fakerPT_BR.phone.number(),
                password: fakerPT_BR.internet.password()
            })

        expect(create_user.status).toBe(201)
    });
})