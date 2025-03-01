import { inject, injectable } from "inversify";
import UserRepositoryImpl from "modules/users/infra/repositories/user-repository-impl";

@injectable()
export default class UserUseCases {
  constructor(
    @inject('UserRepository') user_repository: UserRepositoryImpl
  ) { }
}