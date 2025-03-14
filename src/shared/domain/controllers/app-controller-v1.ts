import {FastifyInstance, RouteShorthandOptions} from "fastify";

export default abstract class AppControllerV1 {
    readonly api_version: string = 'v1'

    abstract register(server: FastifyInstance, options?: RouteShorthandOptions): void
}