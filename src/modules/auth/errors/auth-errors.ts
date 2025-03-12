export class AuthError extends Error {
    constructor(message?: string) {
        super();
    }
}

export class UserNotFoundAuthError extends AuthError {
}

export class HasActiveSessionAuthError extends AuthError {
}