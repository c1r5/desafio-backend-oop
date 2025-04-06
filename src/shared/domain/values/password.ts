import { ValueObject } from "./value-object";

export class UserPassword implements ValueObject {
  private constructor(private readonly password: string) { }
  get value(): string {
    return this.password;
  }

  equals(other: ValueObject): boolean {
    if (!(other instanceof UserPassword)) {
      return false;
    }
    return this.password === other.password;
  }
  
  static from(value: string): UserPassword {
    if (!this.is_valid(value)) {
      throw new Error("Invalid password");
    }
    return new UserPassword(value);
  }
  
  private static is_valid(value: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    return (
      value.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  }
}