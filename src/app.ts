import Fastify, {FastifyInstance, RawServerDefault} from "fastify";
import {DataSource} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import fastifyAuth from "@fastify/auth";
import jwt from "@fastify/jwt";


@injectable()
export default class Application {
    private fastify: FastifyInstance = Fastify({
        logger: true
    });

    constructor(@inject(TYPES.DataSource) private datasource: DataSource) {
        this.fastify.setValidatorCompiler(validatorCompiler);
        this.fastify.setSerializerCompiler(serializerCompiler);
        this.fastify.register(jwt, {
            secret: 'secret',
            sign: {
                expiresIn: 1000 * 60 * 60 * 24 * 7 // 7 days
            }
        })

        this.fastify.register(fastifyAuth)
    }

    async mocked(): Promise<RawServerDefault> {
        await this.fastify.ready();
        return this.fastify.server
    }

    async start_application(): Promise<void> {
        await this.datasource.initialize()
        await this.fastify.listen({
            port: 3000
        })
    }

    register_controller(controller: AppControllerV1): this {
        this.fastify.register((instance) => controller.register(instance), {
            prefix: `/api/${controller.api_version}`
        });
        return this
    }

    register_middleware(middleware: AppMiddleware): this {
        middleware.register(this.fastify)
        return this
    }
}