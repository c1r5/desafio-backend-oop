import {RawServerDefault} from "fastify";
import {DataSource} from "typeorm";
import {container} from "@/shared/infra/di/di-container";
import App from "@/app";
import {TYPES} from "@/shared/infra/di/di-types";
import request from "supertest";
import ControllerModel from "@/shared/domain/models/controller-model";

describe('login test suite', () => {
    let mocked_server: RawServerDefault
    let datasource: DataSource

    beforeAll(async () => {
        const app = container.get<App>(TYPES.ApplicationServer)
        const _datasource = container.get<DataSource>(TYPES.DataSource)
        const auth_controller = container.get<ControllerModel>(TYPES.AuthController)

        auth_controller.register_routes(app.server)

        datasource = await _datasource.initialize()
        mocked_server = await app.mock_on_ready()
    })

    afterAll(async () => {
        await datasource.destroy()
    })

    it('should return 400 invalid credentials', async () => {
        const authenticate = await request(mocked_server)
            .post('/api/login')
            .send({
                email: 'test@test.com',
                password: '123456',
            })

        expect(authenticate.status).toBe(400)
    })

    it('should return 200 and return a jwt token', async () => {
        const authenticate = await request(mocked_server)
            .post('/api/login')
            .send({
                email: 'Suelen62@yahoo.com',
                password: 'j3sIo62gAqqw9lP',
            })

        expect(authenticate.status).toBe(200)
        expect(authenticate.body.access_token).toBeTruthy()
    })

    it('should return 403 with has_session_active message', async () => {
        const authenticate = await request(mocked_server)
            .post('/api/login')
            .send({
                email: 'Suelen62@yahoo.com',
                password: 'j3sIo62gAqqw9lP',
            })

        expect(authenticate.status).toBe(403)
        expect(authenticate.body.message).toBe('has_active_session')
    })

    it('should return 200 and revoke session', async () => {
        const authenticate = await request(mocked_server)
            .get('/api/logout')
            .set({
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmEzZWNmYTQtYjBmZC00MTc5LTk0NDctMWVkYTE0Yzc4YjMzIiwidXNlcl90eXBlIjoicGYiLCJzZXNzaW9uX2lkIjoiYzc3YWZhYWQtMDdhNy00NWUyLWJkY2MtOTJkYmYwNTJiZWIzIiwiaWF0IjoxNzQxNzQwMzYzLCJleHAiOjE3NDE3NDM5NjN9.HrjPD2NAU3A2L6b2X8e4szgFw2T1J_WNJtCcpSYM4S4'
            })


        expect(authenticate.status).toBe(200)
    })
})