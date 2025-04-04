import { ValueObject } from "./value-object";

export interface UserDocument extends ValueObject {
  mask(): string;
}