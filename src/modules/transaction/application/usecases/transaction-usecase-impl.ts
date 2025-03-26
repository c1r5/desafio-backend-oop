import {inject, injectable} from "inversify";
import TransactionRepository from "@/shared/domain/repositories/transaction-repository";
import UserRepository from "@/shared/domain/repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";
import TransactionUsecase from "@/shared/application/usecases/transaction-usecase";

@injectable()
export default class TransactionUsecaseImpl implements TransactionUsecase {
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