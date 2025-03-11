export class AuthError extends Error {
    constructor(message: string) {
        super();
    }
}

export class AuthErrorNotFound extends AuthError {
}
