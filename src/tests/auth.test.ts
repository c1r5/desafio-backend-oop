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
    let jwt_token: string

    beforeAll(async () => {
        const _datasource = container.get<DataSource>(TYPES.DataSource)
        datasource = await _datasource.initialize()

        const app = container.get<App>(TYPES.ApplicationServer)
        const auth_controller = container.get<ControllerModel>(TYPES.AuthController)

        app.register_controller(auth_controller, '/api/v1')
            .setup_application()
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
                Authorization: `Bearer ${jwt_token}`
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


        expect(authenticate.status).toBe(200)
        expect(authenticate.body.access_token).toBeTruthy()

        jwt_token = authenticate.body.access_token
    })
})