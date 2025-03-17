import Fastify, {FastifyInstance, FastifyReply, FastifyRequest, RawServerDefault} from "fastify";
import {DataSource} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import jwt from "@fastify/jwt";
import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import fastifyAuth from "@fastify/auth";

declare module 'fastify' {
    interface FastifyInstance {
        verify_jwt: (request: FastifyRequest, reply: FastifyReply) => void;
    }
}

@injectable()
export default class Application {
    private fastify: FastifyInstance = Fastify({
        logger: true
    });
    private middlewares: AppMiddleware[] = []
    private controllers: AppControllerV1[] = []

    constructor(@inject(TYPES.DataSource) private datasource: DataSource) {
        this.fastify.setValidatorCompiler(validatorCompiler);
        this.fastify.setSerializerCompiler(serializerCompiler);

        this.fastify.decorate('verify_jwt', async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify()
            } catch (err) {
                reply.send(err)
            }
        })

        this.fastify.register(jwt, {
            secret: 'secret',
            sign: {
                expiresIn: '1h'
            }
        });
        this.fastify.register(fastifyAuth)
    }

    async mocked(): Promise<RawServerDefault> {
        await this.fastify.ready();
        return this.fastify.server
    }

    async start_application(): Promise<void> {
        await this.datasource.initialize()

        this.register_middlewares()
        this.register_controllers()

        await this.fastify.listen({
            port: 3000
        })
    }

    register_controller(controller: AppControllerV1): this {
        this.controllers.push(controller)
        return this
    }

    register_middleware(middleware: AppMiddleware): this {
        this.middlewares.push(middleware)
        return this
    }

    private register_middlewares() {
        this.middlewares.forEach(middleware => {
            middleware.register(this.fastify)
        })
    }

    private register_controllers() {
        this.controllers.forEach(controller => {
            this.fastify.register((instance) => controller.register(instance), {
                prefix: `/api/${controller.api_version}`
            });
        })
    }
}