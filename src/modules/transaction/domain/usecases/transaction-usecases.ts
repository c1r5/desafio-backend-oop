import {inject, injectable} from "inversify";
import TransactionRepository from "@/modules/transaction/domain/models/transaction-repository";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";

@injectable()
export default class TransactionUseCases {
    private transaction_repository: TransactionRepository;
    private use_repository: UserRepository;

    constructor(
        @inject(TYPES.TransactionRepository) transaction_repository: TransactionRepository,
        @inject(TYPES.UserRepository) user_repository: UserRepository
    ) {
        this.use_repository = user_repository;
        this.transaction_repository = transaction_repository;
    }
}