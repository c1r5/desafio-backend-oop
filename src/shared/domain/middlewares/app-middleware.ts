import {FastifyInstance} from "fastify";

export default interface AppMiddleware {
    register(app: FastifyInstance): void
}