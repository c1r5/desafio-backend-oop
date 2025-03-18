import {RawServerDefault} from "fastify";
import {DataSource} from "typeorm";
import {container} from "@/shared/infra/di/di-container";
import Application from "@/app";
import {TYPES} from "@/shared/infra/di/di-types";
import request from "supertest";

describe('login test suite', () => {
    let mocked_server: RawServerDefault
    let datasource: DataSource

    beforeAll(async () => {
        const _datasource = container.get<DataSource>(TYPES.DataSource)
        datasource = await _datasource.initialize()

        const app = container.get<Application>(TYPES.ApplicationServer)

        app
            .register_middleware(container.get(TYPES.VerifyUserSessionMiddleware))
            .register_middleware(container.get(TYPES.VerifyUserMiddleware))
            .register_controller(container.get(TYPES.AuthController))


        mocked_server = await app.mocked()
    })

    afterAll(async () => {
        await datasource.destroy()
    })

    it('should return 400 invalid credentials', async () => {
        const authenticate = await request(mocked_server)
            .post('/api/v1/login')
            .send({
                email: 'test@test.com',
                password: '123456',
            })

        expect(authenticate.status).toBe(400)
    })

    it('should return 403 with has_session_active message', async () => {
        const authenticate = await request(mocked_server)
            .post('/api/v1/login')
            .send({
                email: 'Suelen62@yahoo.com',
                password: 'j3sIo62gAqqw9lP',
            })

        expect(authenticate.status).toBe(403)
        expect(authenticate.body.message).toBe('has_active_session')
    })

    it('should return 200 and revoke session', async () => {
        const authenticate = await request(mocked_server)
            .get('/api/v1/logout')
            .set({
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmEzZWNmYTQtYjBmZC00MTc5LTk0NDctMWVkYTE0Yzc4YjMzIiwidXNlcl90eXBlIjoicGYiLCJzZXNzaW9uX2lkIjoiZjUxZWI0YjItOTk1Yy00YmRiLTkxOTctZDRlODMxNzA1ZGRjIiwiaWF0IjoxNzQxOTEzNjUxLCJleHAiOjE3NDE5MTcyNTF9.0OvLoCMlCXowBNCOSXw-wJjzIyToCHZK_OB3lE_5zSs`
            })


        expect(authenticate.status).toBe(200)
    })

    it('should return 200 and return a jwt token', async () => {
        const authenticate = await request(mocked_server)
            .post('/api/v1/login')
            .send({
                email: 'Suelen62@yahoo.com',
                password: 'j3sIo62gAqqw9lP',
            })

        console.log(`[+] token: ${authenticate.body.access_token}`)

        expect(authenticate.status).toBe(200)
        expect(authenticate.body.access_token).toBeTruthy()
    })

    it('should return 401 jwt verify error', async () => {
        const authenticate = await request(mocked_server)
            .get('/api/v1/logout')
            .set({
                Authorization: `Bearer INVALID_JWT`
            })

        expect(authenticate.status).toBe(401)
    })
})