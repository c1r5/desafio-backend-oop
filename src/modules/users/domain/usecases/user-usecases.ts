import {inject, injectable} from "inversify";
import UserRepository from "../repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";
import {User} from "../entities/user-entity";

@injectable()
export default class UserUseCases {
  private user_repository: UserRepository;
  constructor(
    @inject(TYPES.UserRepository) user_repository: UserRepository
  ) {
    this.user_repository = user_repository;
  }

  async create_user(user: User) {
    return this.user_repository.orm_repo.create()
  }
}