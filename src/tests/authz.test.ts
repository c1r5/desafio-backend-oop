import {RawServerDefault} from "fastify";
import {container} from "@/shared/infra/di/di-container";
import Application from "@/app";
import {TYPES} from "@/shared/infra/di/di-types";
import {DataSource} from "typeorm";
import request from "supertest";

describe('authorization test suite', () => {
    let mocked_server: RawServerDefault;
    let datasource: DataSource;

    beforeAll(async () => {
        const _datasource = container.get<DataSource>(TYPES.DataSource);
        datasource = await _datasource.initialize();

        const app = container.get<Application>(TYPES.ApplicationServer);

        app
            .register_middleware(container.get(TYPES.VerifyUserSessionMiddleware))
            .register_middleware(container.get(TYPES.VerifyUserMiddleware))
            .register_middleware(container.get(TYPES.VerifyUserTransferAbilityMiddleware))
            .register_controller(container.get(TYPES.LoginController))
            .register_controller(container.get(TYPES.TransactionController))

        mocked_server = await app.mocked();
    })

    afterAll(async () => {
        await datasource.destroy()
    })

    it('should unauthorize a inactive user and response with 401', async () => {
        const check_status = await request(mocked_server)
            .post("/api/v1/transfer")
            .set({authorization: 'Bearer <TOKEN>'})
            .send({});

        expect(check_status.status).toBe(401)
        expect(check_status.body.message).toBe('user_is_inactive');
    })

    it('should unauthorize inactive session and respond with 401', async () => {
        const check_session = await request(mocked_server)
            .post("/api/v1/transfer")
            .set({authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmEzZWNmYTQtYjBmZC00MTc5LTk0NDctMWVkYTE0Yzc4YjMzIiwidXNlcl90eXBlIjoicGYiLCJzZXNzaW9uX2lkIjoiZjUxZWI0YjItOTk1Yy00YmRiLTkxOTctZDRlODMxNzA1ZGRjIiwiaWF0IjoxNzQxOTEzNjUxLCJleHAiOjE3NDE5MTcyNTF9.0OvLoCMlCXowBNCOSXw-wJjzIyToCHZK_OB3lE_5zSs'})
            .send({});

        expect(check_session.status).toBe(401)
        expect(check_session.body.message).toBe('no_active_session')
    })

    it('should avoid PJ users to use transfer endpoints', async () => {
        const check_transfer = await request(mocked_server)
            .post('/api/v1/transfer')
            .set({authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmEzZWNmYTQtYjBmZC00MTc5LTk0NDctMWVkYTE0Yzc4YjMzIiwidXNlcl90eXBlIjoicGoiLCJzZXNzaW9uX2lkIjoiMmI4N2U1MGEtOTE2Yi00NjNhLThkZDktZWFiNWRhYzRhYjI0IiwiaWF0IjoxNzQxOTE4NTM0LCJleHAiOjE3NDE5MjIxMzR9.HyI3B7AXqcisa5Ib-Z_avusSbhrqvMBaNk64c_cE-k0'})
            .send({});

        expect(check_transfer.status).toBe(403)
        expect(check_transfer.body.message).toBe('user_cannot_transfer')
    })
})