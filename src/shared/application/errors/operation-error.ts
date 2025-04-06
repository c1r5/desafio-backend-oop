
export class OperationError extends Error {
    constructor(public code: number, message: string) {
        super(message);
    }
}

export class UserNotFound extends OperationError {
    constructor() {
        super(404, 'user_not_found');
    }
}

export class InvalidCredentials extends OperationError {
    constructor(
        public field: string = 'credentials'
    ) {
        super(400, `invalid_${field}`);
    }
}

export class HasActiveSession extends OperationError {
    constructor() {
        super(403, 'has_active_session');
    }
}

export class CannotCreateUser extends OperationError {
    constructor(message: string = 'cannot_create_user') {
        super(500, message);
    }
}

export class UserAlreadyExist extends OperationError {
    constructor(message: string = 'user_already_exist') {
        super(400, message);
    }
}