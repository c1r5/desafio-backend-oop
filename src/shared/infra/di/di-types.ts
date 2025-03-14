export const TYPES = {
    DataSource: Symbol.for('DataSource'),
    ApplicationServer: Symbol.for('ApplicationServer'),

    UserRepository: Symbol.for('UserRepository'),
    UserUseCases: Symbol.for('UserUseCases'),
    UserController: Symbol.for('UserController'),

    TransactionUseCases: Symbol.for('TransactionUseCases'),
    TransactionRepository: Symbol.for('TransactionRepository'),
    TransactionController: Symbol.for('TransactionController'),

    AuthUsecase: Symbol.for('AuthUsecase'),
    AuthRepository: Symbol.for('AuthRepository'),
    AuthController: Symbol.for('AuthController'),


    SessionValidationMiddleware: Symbol.for('SessionValidationMiddleware'),
    UserValidationMiddleware: Symbol.for('UserValidationMiddleware'),
    VerifyUserTransferAbilityMiddleware: Symbol.for('VerifyUserTransferAbilityMiddleware')
};
