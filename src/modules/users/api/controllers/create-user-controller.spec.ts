import { RawServerDefault } from "fastify";
import { container } from "@/shared/infra/di/di-container";
import Application from "@/app";
import { TYPES } from "@/shared/infra/di/di-types";
import request from "supertest";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { CPF } from "@/shared/domain/values/cpf";
import dotenv from "dotenv";
describe('CreateUserController', () => {
  let server: RawServerDefault;
  let app: Application;

  beforeAll(async () => {
    dotenv.config();

    app = container.get<Application>(TYPES.ApplicationServer)
      .register_controller(container.get(TYPES.CreateUserController));

    await app.start_datasource()
    server = await app.mocked();
  });

  afterAll(() => {
    app.stop_datasource();
  });

  it('should create a user', async () => {
    const response = await request(server)
      .post('/api/v1/user/create')
      .send({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 8,
          pattern: /^[0-9]+$/
        }),
        document: CPF.generate(),
        phone: faker.phone.number({ style: 'national' }),
      })

    expect(response.status).toBe(201);
  });
});