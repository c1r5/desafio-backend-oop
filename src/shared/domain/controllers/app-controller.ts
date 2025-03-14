import {FastifyInstance, RouteShorthandOptions} from "fastify";

export default interface AppController {
    register(server: FastifyInstance, options?: RouteShorthandOptions): void
}