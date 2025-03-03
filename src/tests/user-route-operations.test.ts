import request from 'supertest';
import {RawServerDefault} from "fastify";
import App from "@/app";
import {container} from "@/shared/infra/di/di-container";
import {UserController} from "@/modules/users/interfaces/controllers/user-controller";
import {TYPES} from "@/shared/infra/di/di-types";
import {fakerPT_BR} from "@faker-js/faker";
import {generate_cpf} from "@/helpers";

describe('User Route Operations', () => {
    let server: RawServerDefault

    beforeAll(async () => {
        let app = new App();
        let user_controller = container.get<UserController>(TYPES.UserController)
        app.register_api_controller(user_controller)
        server = await app.mock_on_ready()
    });

    afterAll(async () => {
        server.close()
    })

    it('should responds with 404', (done) => {
        request(server)
            .get('/api/user/create')
            .expect(404, done)
    });

    it('should create user and responds with 200', (done) => {
        request(server)
        .post('/api/user/create')
        .send({
            name: fakerPT_BR.person.fullName(),
            email: fakerPT_BR.internet.email(),
            document: generate_cpf(),
            password: fakerPT_BR.internet.password()
        }).expect(200, done)
    });
})