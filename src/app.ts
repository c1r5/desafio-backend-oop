import Fastify, { FastifyInstance, RawServerDefault } from "fastify";
import { DataSource } from "typeorm";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "@/shared/infra/di/di-types";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import fastifyAuth from "@fastify/auth";
import jwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import { get_env } from "./shared/application/helpers/get-env";

@injectable()
export default class Application {
    private fastify: FastifyInstance = Fastify({
        logger: true
    });

    constructor(
        @inject(DI_TYPES.DataSource) private datasource: DataSource
    ) {
        this.fastify.setValidatorCompiler(validatorCompiler);
        this.fastify.setSerializerCompiler(serializerCompiler);
        this.fastify.register(jwt, {
            secret: get_env('SESSION_SERVICE_JWT_SECRET') as string,
            sign: {
                expiresIn: 1000 * 60 * 60 * 24 * 7 // 7 dias
            }
        });

        this.fastify.register(fastifyAuth);
        this.fastify.register(fastifyCors, { origin: true });
        this.fastify.register(fastifyHelmet);
        this.fastify.register(fastifyRateLimit, {
            max: 100,
            timeWindow: '1 minute'
        });
    }

    async mocked(): Promise<RawServerDefault> {
        await this.fastify.ready();
        return this.fastify.server;
    }

    async start_application(): Promise<void> {
        try {
            await this.start_datasource()
            await this.fastify.listen({ port: 3000 });
        } catch (error) {
            this.fastify.log.error(error);
            process.exit(1);
        }
    }

    async start_datasource(): Promise<void> {
        try {
            await this.datasource.initialize();
        } catch (error) {
            this.fastify.log.error(error);
            process.exit(1);
        }
    }

    async stop_datasource(): Promise<void> {
        try {
            await this.datasource.destroy();
        } catch (error) {
            this.fastify.log.error(error);
            process.exit(1);
        }
    }

    register_controller(controller: AppControllerV1): this {
        this.fastify.register((instance) => controller.register(instance), {
            prefix: `/api/${controller.api_version}`
        });
        return this;
    }

    register_middleware(middleware: AppMiddleware): this {
        middleware.register(this.fastify);
        return this;
    }
}