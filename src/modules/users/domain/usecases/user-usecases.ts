import { inject, injectable } from "inversify";
import UserRepository from "../repositories/user-repository";
import {TYPES} from "@shared/infra/di/di-types";

@injectable()
export default class UserUseCases {
  constructor(
    @inject(TYPES.UserRepository) user_repository: UserRepository
  ) { }
}