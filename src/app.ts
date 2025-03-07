import fastify, {FastifyInstance, FastifyReply, FastifyRequest, RawServerDefault,} from "fastify";
import jwt from "@fastify/jwt";

import EventEmitter from "node:events";


export default class App extends EventEmitter<{
    error: [Error],
    connect: [string]
}> {
    private readonly app: FastifyInstance = fastify({logger: true});
    private port: number

    constructor(port?: number) {
        super()
        this.port = port || 3000;

        this.app.register(jwt, {
            secret: 'secret',
            sign: {
                expiresIn: '1h'
            }
        });
        this.app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
            }
        });

    }

    async mock_on_ready(): Promise<RawServerDefault> {
        await this.app.ready()
        return this.app.server
    }

    server(): FastifyInstance {
        return this.app
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