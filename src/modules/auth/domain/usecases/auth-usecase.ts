import {JWT} from "@fastify/jwt";

export default interface AuthUsecase {
    authenticate_user(
        jwt: JWT,
        login: string,
        password: string
    ): Promise<string>
}