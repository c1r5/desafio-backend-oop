import fastify, { FastifyBaseLogger, FastifyInstance, FastifyReply, FastifyRequest, FastifySchema, FastifyTypeProviderDefault, RawServerBase, RawServerDefault, RouteGenericInterface, RouteOptions } from "fastify";
import { ResolveFastifyRequestType } from "fastify/types/type-provider";
import { IncomingMessage, ServerResponse } from "http";
import EventEmitter from "node:events";
import ControllerModel from "shared/domain/models/controller-model";


export default class App extends EventEmitter<{
  error: [Error],
  connect: [string]
}> {
  public mock_server: RawServerBase
  private app: FastifyInstance
  private port: number
  private routes: RouteOptions[] = [];

  private health_check_route: RouteOptions = {
    method: "GET",
    url: "/health",
    handler: function (this: FastifyInstance<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, FastifyBaseLogger, FastifyTypeProviderDefault>, request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RouteGenericInterface, RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>): unknown {
      throw new Error("Function not implemented.");
    }
  }
  constructor(port?: number) {
    super()
    this.app = fastify()
    this.port = port || 3000
    this.mock_server = this.app.server
    this.routes.push(this.health_check_route)
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
}