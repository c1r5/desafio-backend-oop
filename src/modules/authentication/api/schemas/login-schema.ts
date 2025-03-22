export interface LoginResponseSchema {
    message: string
    access_token?: string
}

export interface LoginRequestSchema {
    document?: string,
    email: string,
    password: string
}