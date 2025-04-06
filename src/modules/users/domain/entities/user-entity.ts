import UserModel from "../model/user-model";
import { CNPJ } from "@/shared/domain/values/cnpj";
import { CPF } from "@/shared/domain/values/cpf";
import { UserEmail } from "@/shared/domain/values/email";
import { UserPassword } from "@/shared/domain/values/password";
import { UserPhone } from "@/shared/domain/values/phone";
import { UserDocument } from "@/shared/domain/values/user-document";

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

    let document: UserDocument

    try {
      document = CPF.from(schema.document)
    } catch (e) {
      document = CNPJ.from(schema.document)
    }

    new_entity.name = schema.name;
    new_entity.user_type = document.type;
    new_entity.email = schema.email ? UserEmail.from(schema.email) : undefined;
    new_entity.phone = schema.phone ? UserPhone.from(schema.phone) : undefined;
    new_entity.document = document
    new_entity.password = schema.password ? UserPassword.from(schema.password) : undefined;

    return new_entity
  }
}