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

export class InvalidCredentials extends LoginError {
    constructor(
        public field: string = 'credentials'
    ) {
        super(400, `invalid_${field}`);
    }
}