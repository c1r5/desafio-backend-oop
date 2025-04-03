import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {injectable} from "inversify";
import {JWT_PAYLOAD_SCHEMA} from "@/shared/api/schemas/jwt-payload-schema";

declare module 'fastify' {
    interface FastifyInstance {
        verify_user_transfer_ability: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => void
    }
}

@injectable()
export default class VerifyUserTransferAbilityMiddleware implements AppMiddleware {
    constructor() {
    }

    register(app: FastifyInstance): void {
        app.decorate('verify_user_transfer_ability', async (
            request: FastifyRequest,
            reply: FastifyReply
        ) => {

            const {user_type} = JWT_PAYLOAD_SCHEMA.parse(request.user);

            if (!user_type) {
                return reply.status(401).send({
                    message: 'invalid_token'
                })
            }

            if (user_type == 'pj') {
                return reply.status(403).send({
                    message: 'user_cannot_transfer'
                })
            }

            return
        })
    }

}