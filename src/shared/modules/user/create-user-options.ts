import { UserEmail } from "@/shared/domain/values/email";
import { UserPassword } from "@/shared/domain/values/password";
import { UserPhone } from "@/shared/domain/values/phone";
import { UserDocument } from "@/shared/domain/values/user-document";

export type UserName = string;

export type CreateUserOptions = {
  email: UserEmail,
  password: UserPassword,
  name: UserName,
  document: UserDocument,
  phone: UserPhone
}
