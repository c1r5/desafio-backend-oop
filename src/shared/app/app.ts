import fastify, { FastifyInstance, RawServerBase } from "fastify";
import EventEmitter from "node:events";
import ControllerModel from "shared/domain/models/controller-model";


export default class App extends EventEmitter<{
  error: [Error],
  connect: [string]
}> {
  public mock_server: RawServerBase
  private app: FastifyInstance
  private port: number
  constructor(port?: number) {
    super()
    this.app = fastify()
    this.port = port || 3000
    this.mock_server = this.app.server
  }

  register_controller(controller: ControllerModel) {
    this.app.route(controller.options)
  }

  start() {
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