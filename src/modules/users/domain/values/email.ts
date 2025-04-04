import z from "zod";
import { ValueObject } from "./value-object";

export class UserEmail implements ValueObject {
  constructor(private readonly email: string) { }
  get value(): string {
    return this.email;
  }

  equals(other: ValueObject): boolean {
    if (!(other instanceof UserEmail)) {
      return false;
    }
    return this.email === other.value;
  }

  static from(value: string): UserEmail {
    if (!this.is_valid(value)) {
      throw new Error(`Invalid email: ${value}`);
    }
    return new UserEmail(value);
  }

  static is_valid(value: string): boolean {
    return z.string().email().safeParse(value).success;
  }
}