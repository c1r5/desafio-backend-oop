export class LoginError extends Error {
    constructor(public code: number, message: string) {
        super(message);
    }
}

export class UserNotFound extends LoginError {
    constructor() {
        super(404, 'user_not_found');
    }
}

export class InvalidPassword extends LoginError {
    constructor() {
        super(401, 'invalid_password');
    }
}

export class InvalidCredentials extends LoginError {
    constructor() {
        super(400, 'invalid_credentials');
    }
}