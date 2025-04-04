import { UserCreateRequest } from "../../api/schemas/user-create-schemas";
import { CNPJ } from "../values/cnpj";
import { CPF } from "../values/cpf";
import { UserEmail } from "../values/email";
import { UserPassword } from "../values/password";
import { UserPhone } from "../values/phone";
import { UserDocument } from "../values/user-document";

export class UserEntity {
  private constructor(
    public readonly name: string,
    public readonly email: UserEmail,
    public readonly phone: UserPhone,
    public readonly document: UserDocument,
    public readonly password: UserPassword,
    public readonly user_type: string = document.type,
  ) { }

  static from(schema: Record<string, string>): UserEntity
  static from(schema: UserCreateRequest): UserEntity {
    let document: UserDocument;

    try {
      document = CPF.from(schema.document);
    } catch (error) {
      document = CNPJ.from(schema.document);
    }

    return new UserEntity(
      schema.name,
      UserEmail.from(schema.email),
      UserPhone.from(schema.phone),
      document,
      UserPassword.from(schema.password),
    );
  }
}