import { SendmailOptions } from "../../application/schemas/sendmail-options";

export interface MailerClientStrategy {
  send(options: SendmailOptions): Promise<void>;
}