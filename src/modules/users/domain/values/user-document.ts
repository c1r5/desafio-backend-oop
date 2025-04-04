import { ValueObject } from "./value-object";

export interface UserDocument extends ValueObject {
  type: string;
  mask(): string;
}