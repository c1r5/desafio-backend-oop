export interface LoginResponse {
    message: string
    access_token?: string
}

export interface LoginRequest {
    document?: string,
    email: string,
    password: string
}