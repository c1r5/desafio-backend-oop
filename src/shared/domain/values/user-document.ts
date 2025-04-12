import { CNPJ } from "./cnpj";
import { CPF } from "./cpf";
import { ValueObject } from "./value-object";

export abstract class UserDocument implements ValueObject {
  abstract get value(): string;
  abstract equals(other: ValueObject): boolean;
  abstract type: string;
  abstract mask(): string;

  static from(value: string): UserDocument {
    let document: UserDocument

    try {
      document = CPF.from(value)
    } catch (e) {
      document = CNPJ.from(value)
    }

    return document
  }
}