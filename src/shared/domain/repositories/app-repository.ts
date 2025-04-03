import {QueryRunner} from "typeorm";

export default interface AppRepository {
    get query_runner(): QueryRunner
}