import { RawServerDefault } from "fastify";
import { container } from "@/shared/infra/di/di-container";
import Application from "@/app";
import { TYPES } from "@/shared/infra/di/di-types";
import request from "supertest";
import { fakerPT_BR } from "@faker-js/faker";
import {CNPJ} from "@/shared/domain/values/cnpj";

describe('crate user test suite', () => {
    let app: Application = container.get(TYPES.ApplicationServer);
    let mocked_server: RawServerDefault;

    beforeAll(async () => {
        app
            .register_middleware(container.get(TYPES.VerifyJWTMiddleware))
            .register_middleware(container.get(TYPES.VerifySessionMiddleware))
            .register_middleware(container.get(TYPES.VerifyUserMiddleware))
            .register_middleware(container.get(TYPES.VerifyUserTransferAbilityMiddleware))
            .register_controller(container.get(TYPES.UserController))

        await app.start_datasource()
        await app.start_notifications()

        mocked_server = await app.mocked();
    });

    afterAll(async () => {
        await app.stop_datasource()
    });

    it('should create a user and return 201', async () => {
        const create_user = await request(mocked_server)
            .post('/api/v1/user/create')
            .send({
                name: fakerPT_BR.person.fullName(),
                document: CNPJ.generate(),
                email: fakerPT_BR.internet.email(),
                phone: fakerPT_BR.phone.number(),
                password: fakerPT_BR.internet.password()
            })

        expect(create_user.status).toBe(201)
    });
})