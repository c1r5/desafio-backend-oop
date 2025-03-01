import { Repository } from "typeorm";
import UserEntity from "../entities/user-entity";

export default abstract class UserRepository {
  abstract repo: Repository<UserEntity>
}