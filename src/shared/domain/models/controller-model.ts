import {FastifyInstance, RouteShorthandOptions} from "fastify";

export default interface ControllerModel {
    register_routes(server: FastifyInstance, options?: RouteShorthandOptions): void
}