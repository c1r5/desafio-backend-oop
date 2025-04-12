import { container } from "@/shared/infra/di/di-container";
import { TYPES } from "@/shared/infra/di/di-types";
import UserUseCases from "@/shared/modules/user/user-usecases";
import { DataSource } from "typeorm";

describe('user_usecases_test', () => {
  let usecases: UserUseCases;
  let datasource: DataSource;

  beforeAll(async () => {
    datasource = await container.get<DataSource>(TYPES.DataSource).initialize();

    usecases = container.get(TYPES.UserUseCases);
  });

  afterAll(() => {
    datasource.destroy();
  })

  it('should create user and not return error', async () => {
    await usecases.create_user({
      
    })
  });
});