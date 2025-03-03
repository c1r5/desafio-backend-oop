import fastify, {
  FastifyInstance,
  RawServerDefault,
} from "fastify";


import EventEmitter from "node:events";
import ControllerModel from "@/shared/domain/models/controller-model";


export default class App extends EventEmitter<{
  error: [Error],
  connect: [string]
}> {
  private readonly app: FastifyInstance
  private port: number

  constructor(port?: number) {
    super()

    this.port = port || 3000
    this.app = fastify()
  }

  async mock_on_ready(): Promise<RawServerDefault> {
    await this.app.ready()
    return this.app.server
  }

  register_api_controller(controller: ControllerModel): this {

    this.app.register(server => {
      for (const route of controller.options) {
        console.log(`[+] Routing ${route.url}`)
        server.route(route)
      }
    }, { prefix: '/api' });

    return this
  }

  async start() {

    await this.app.listen({ port: this.port })
      .then(server => {
        console.log(`[+] Server listening at: ${server}`)
        this.emit('connect', server)
      })
      .catch(err => {
        this.emit('error', err)
      })
  }
}