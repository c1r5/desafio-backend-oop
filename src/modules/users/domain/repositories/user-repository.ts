import {DataSource, Repository} from "typeorm";
import UserEntity from "../entities/user-entity";

export default abstract class UserRepository {
  abstract orm_repo: Repository<UserEntity>;
  abstract datasource: DataSource
}