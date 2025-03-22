export const TYPES = {
    DataSource: Symbol.for('DataSource'),
    ApplicationServer: Symbol.for('ApplicationServer'),

    UserRepository: Symbol.for('UserRepository'),
    UserUseCases: Symbol.for('UserUseCases'),
    UserController: Symbol.for('UserController'),

    TransactionUseCases: Symbol.for('TransactionUseCases'),
    TransactionRepository: Symbol.for('TransactionRepository'),
    TransactionController: Symbol.for('TransactionController'),

    SessionRepository: Symbol.for('SessionRepository'),
    SessionUseCase: Symbol.for('SessionUsecase'),

    LoginController: Symbol.for('LoginController'),
    LogoutController: Symbol.for('LogoutController'),

    VerifyJWTMiddleware: Symbol.for('JWTValidationMiddleware'),
    VerifyUserSessionMiddleware: Symbol.for('SessionValidationMiddleware'),
    VerifyUserMiddleware: Symbol.for('UserValidationMiddleware'),
    VerifyUserTransferAbilityMiddleware: Symbol.for('VerifyUserTransferAbilityMiddleware'),
};
