import { ValueObject } from "./value-object";

export class UserPhone implements ValueObject {
  private constructor(private readonly phone: string) { }

  get value(): string {
    return this.phone;
  }

  static from(phone: string): UserPhone {
    if (!/^\+\d{1,3}\s?\d{4,14}$/.test(phone)) {
      throw new Error("Invalid phone number format.");
    }
    return new UserPhone(phone);
  }

  static format(phone: string): string {
    // Format the phone number to a standard format
    return phone.replace(/\D/g, "").replace(/(\d{2})(\d{3})(\d{4})/, "($1) $2-$3");
  }

  equals(other: ValueObject): boolean {
    if (!(other instanceof UserPhone)) {
      return false;
    }
    return this.phone === other.phone;
  }
}