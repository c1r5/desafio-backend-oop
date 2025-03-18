import {RawServerDefault} from "fastify";
import {DataSource} from "typeorm";
import {container} from "@/shared/infra/di/di-container";
import {TYPES} from "@/shared/infra/di/di-types";
import Application from "@/app";
import request from "supertest";

describe('user update suite', () => {
    let mocked_server: RawServerDefault;
    let datasource: DataSource;

    beforeAll(async () => {
        datasource = container.get(TYPES.DataSource);
        await datasource.initialize();

        const application: Application = container.get(TYPES.ApplicationServer);
        application
            .register_middleware(container.get(TYPES.VerifyUserSessionMiddleware))
            .register_controller(container.get(TYPES.UserController));

        mocked_server = await application.mocked();
    });

    afterAll(async () => {
        await datasource.destroy();
    });

    it('should email update request, update, and return 200', async () => {
        const response = await request(mocked_server)
            .post('/api/v1/user/update')
            .send({});

        expect(response.status).toBe(200);
    });
})