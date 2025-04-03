import {FastifyInstance, preHandlerHookHandler, RouteShorthandOptions} from "fastify";

export default abstract class AppControllerV1 {
    readonly api_version: string = 'v1'

    abstract register(server: FastifyInstance, options?: RouteShorthandOptions): void
    abstract auth_middleware(server: FastifyInstance): preHandlerHookHandler
}