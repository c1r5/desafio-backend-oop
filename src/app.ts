import Fastify, {FastifyInstance, FastifyReply, FastifyRequest, RawServerDefault} from "fastify";
import {DataSource} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import ControllerModel from "@/shared/domain/models/controller-model";
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import jwt from "@fastify/jwt";

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

@injectable()
export default class Application {
    private fastify: FastifyInstance = Fastify();

    constructor(@inject(TYPES.DataSource) private datasource: DataSource) {
    }

    async mocked(): Promise<RawServerDefault> {
        await this.fastify.ready();

        return this.fastify.server
    }

    setup_application(): void {
        this.fastify.setValidatorCompiler(validatorCompiler);
        this.fastify.setSerializerCompiler(serializerCompiler);

        this.fastify.register(jwt, {
            secret: 'secret',
            sign: {
                expiresIn: '1h'
            }
        });

        this.fastify
            .decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
                try {
                    await request.jwtVerify()
                } catch (err) {
                    reply.send(err)
                }
            })
    }

    async start_application(): Promise<void> {
        await this.datasource.initialize()
        await this.fastify.listen({
            port: 3000
        })
    }

    register_controller(controller: ControllerModel, prefix: string): this {
        this.fastify
            .register(instance => controller.register_routes(instance), {prefix})
        return this
    }
}