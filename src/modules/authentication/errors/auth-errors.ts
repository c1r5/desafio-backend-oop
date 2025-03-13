export class AuthError extends Error {
    constructor(_message?: string) {
        super();
    }
}

export class UserNotFoundAuthError extends AuthError {
}

export class HasActiveSessionAuthError extends AuthError {
}

export class LogoutAuthError extends AuthError {
}