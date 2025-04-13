import { SendmailOptions } from "@/shared/application/schemas/sendmail-options";
import { API_URL } from "@/shared/domain/values/mailer-api-url";
import { MailerClientStrategy } from "@/shared/modules/notification/mailer-client-strategy";
import axios from "axios";

export default class MailerClientMockImpl implements MailerClientStrategy {
  constructor() {}

  async send(options: SendmailOptions): Promise<void> {
    try {
      const response = await axios.post(API_URL, options);
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}