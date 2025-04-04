import { UserCreateRequest } from "../../api/schemas/user-create-schemas";
import { UserEmail } from "../values/email";
import { UserPhone } from "../values/phone";
import { UserDocument } from "../values/user-document";

export class UserEntity {
  private constructor(
    private _name: string,
    private _email: UserEmail,
    private _phone: UserPhone,
    private _document: UserDocument,
    private _password: string,
  ) { }

  static from(schema: UserCreateRequest): UserEntity {
    return new UserEntity(
      schema.name,
      UserEmail.from(schema.email),
      UserPhone.from(schema.phone),
      UserDocument.from(schema.document),
      schema.password,
    );
  }
}