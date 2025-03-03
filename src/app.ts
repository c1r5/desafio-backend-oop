import fastify, {
  FastifyInstance,
  RawServerBase,
  RouteOptions
} from "fastify";

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import EventEmitter from "node:events";
import ControllerModel from "@/shared/domain/models/controller-model";


export default class App extends EventEmitter<{
  error: [Error],
  connect: [string]
}> {
  public mock_server: RawServerBase

  private app: FastifyInstance
  private port: number
  private routes: RouteOptions[] = [];

  constructor(port?: number) {
    super()

    this.port = port || 3000
    this.app = fastify()
    this.mock_server = this.app.server

    this.setup_swagger()
  }

  register_api_controller(controller: ControllerModel): this {
    this.routes.push(...controller.options)

    return this
  }

  start() {
    this.app.register(server => {
      for (const route of this.routes) {
        console.log(`[+] Routing ${route.url}`)
        server.route(route)
      }
    }, { prefix: '/api' });

    this.app.listen({ port: this.port })
      .then(server => {
        console.log(`[+] Server listening at: ${server}`)
        this.emit('connect', server)
      })
      .catch(err => {
        this.emit('error', err)
      })
  }

  private setup_swagger = () => {
    this.app.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
    });

    this.app.register(swagger, {
      openapi: {
        info: {
          title: 'Fastify TypeScript API',
          description: 'A sample API with Fastify, TypeScript, and Swagger',
          version: '1.0.0',
        },
        servers: [
          { url: 'http://localhost:3000' },
        ],
      },
    });
  }
}