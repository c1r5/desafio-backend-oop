export class CreateUserError extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export class UserAlreadyExist extends CreateUserError {
    constructor(message: string = 'user_already_exist') {
        super(message);
    }
}

export class CannotCreateUser extends CreateUserError {
    constructor(message: string = 'cannot_create_user') {
        super(message);
    }
}