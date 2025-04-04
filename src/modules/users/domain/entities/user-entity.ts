import UserModel from "../model/user-model";
import { CNPJ } from "../values/cnpj";
import { CPF } from "../values/cpf";
import { UserEmail } from "../values/email";
import { UserPassword } from "../values/password";
import { UserPhone } from "../values/phone";
import { UserDocument } from "../values/user-document";

export class UserEntity {
  private constructor(
    public name?: string,
    public email?: UserEmail,
    public phone?: UserPhone,
    public document?: UserDocument,
    public password?: UserPassword,
    public user_type?: string,
  ) { }

  static from(schema: Partial<UserModel>): UserEntity {
    const new_entity = new UserEntity();

    new_entity.name = schema.name;
    new_entity.user_type = schema.user_type;
    new_entity.email = schema.email ? UserEmail.from(schema.email) : undefined;
    new_entity.phone = schema.phone ? UserPhone.from(schema.phone) : undefined;
    new_entity.document = schema.document ? (schema.document.length === 11 ? CPF.from(schema.document) : CNPJ.from(schema.document)) : undefined;
    new_entity.password = schema.password ? UserPassword.from(schema.password) : undefined;

    return new_entity
  }
}