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
            .register_middleware(container.get(TYPES.VerifyUserMiddleware))
            .register_middleware(container.get(TYPES.VerifyUserSessionMiddleware))
            .register_middleware(container.get(TYPES.VerifyUserTransferAbilityMiddleware))
            .register_middleware(container.get(TYPES.VerifyJWTMiddleware))
            .register_controller(container.get(TYPES.UserController));

        mocked_server = await application.mocked();
    });

    afterAll(async () => {
        await datasource.destroy();
    });

    it('should email update request, update, and return 200', async () => {
        const response = await request(mocked_server)
            .post('/api/v1/user/update')
            .set({authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmJiOTVjMjktYmU3Mi00Y2IyLTk0NWEtNDZkODYxNzUzYmVlIiwidXNlcl90eXBlIjoicGYiLCJzZXNzaW9uX2lkIjoiNWVkYjc0ZDMtYzQ2ZC00NWRmLTg1ZGYtN2QxMGJjNDQyNGRlIiwiaWF0IjoxNzQyMzQ4MDMyLCJleHAiOjE3NDIzNTE2MzJ9.7H6QMpZirIuF6hzrZ-SLiMUYx7a-v3sgv3drhtwme5I'})
            .send({});

        expect(response.status).toBe(200);
    });
})