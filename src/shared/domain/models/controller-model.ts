import {FastifyInstance} from "fastify";

export default interface ControllerModel {
    register_routes(app: FastifyInstance): void
}