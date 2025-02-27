import { RouteOptions } from "fastify";

export default abstract class ControllerModel {
  abstract options: RouteOptions
}