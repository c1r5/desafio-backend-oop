import {UserController} from "@/modules/users/interfaces/controllers/user-controller";
import App from "@/app";
import {RawServerDefault} from "fastify";
import {DataSource} from "typeorm";
import {AppDataSource} from "@/shared/infra/datasources/app-data-source";
import {container} from "@/shared/infra/di/di-container";
import request from "supertest";
import {TYPES} from "@/shared/infra/di/di-types";

describe('user controller', () => {

    let datasource: DataSource
    let mocked_server: RawServerDefault

    beforeAll(async () => {
        datasource = await AppDataSource.initialize()

        let app = new App()
        let instance = app.server()
        let user_controller = container.get<UserController>(TYPES.UserController)

        user_controller.register_routes(instance)

        mocked_server = await app.mock_on_ready()
    });

    afterAll(async () => {
        await datasource.destroy()
    });


    it('should respond with 200 OK', async () => {
        let req = await request(mocked_server).post('/api/user/login').send({})
        expect(req.status).toBe(200)
    })

    it('should return a jwt token', async () => {
        let req = await request(mocked_server)
            .post('/api/user/login')
            .send({
                document: "62179627566",
                password: "EkNr0nC7oc5euG_"
            });

        expect(req.status).toBe(200)
        expect(req.body.token).toBeTruthy()
    })

})