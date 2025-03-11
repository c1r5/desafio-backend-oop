import fastify, {FastifyInstance, FastifyReply, FastifyRequest, RawServerDefault,} from "fastify";
import jwt, {JWT} from "@fastify/jwt";

import EventEmitter from "node:events";
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";


export default class App extends EventEmitter<{
    error: [Error],
    connect: [string]
}> {
    private readonly app: FastifyInstance = fastify({logger: true});

    constructor(private port: number = 3000) {
        super()

        this.app.register(jwt, {
            secret: 'secret',
            sign: {
                expiresIn: '1h'
            }
        });

        this.app.setValidatorCompiler(validatorCompiler);
        this.app.setSerializerCompiler(serializerCompiler);

        this.app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
            }
        });

    }

    get server(): FastifyInstance {
        return this.app
    }

    get jwt(): JWT {
        return this.app.jwt
    }

    async mock_on_ready(): Promise<RawServerDefault> {
        await this.app.ready()
        return this.app.server
    }

    async start() {

        await this.app.listen({port: this.port})
            .then(server => {
                console.log(`[+] Server listening at: ${server}`)
                this.emit('connect', server)
            })
            .catch(err => {
                this.emit('error', err)
            })
    }
}