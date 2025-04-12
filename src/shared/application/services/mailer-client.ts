import axios, { AxiosInstance } from "axios";
import { SENDMAIL_OPTIONS } from "../schemas/sendmail-options";

export type MailerClientOptions = {
  host: string;
  port: number;
}

export default class MailerClient {
  static instance: MailerClient;


  private constructor(
    private api: AxiosInstance
  ) { }

  static create(options: MailerClientOptions): MailerClient {
    if (!this.instance) {
      this.instance = new MailerClient(
        axios.create({
          baseURL: `${options.host}:${options.port}`,
        })
      );
    }
    return this.instance;
  }

  async send_email(options: Record<string, any>): Promise<void> {
    await this.api.post("/send-mail", SENDMAIL_OPTIONS.parse(options));
  }
}