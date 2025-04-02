import {SENDMAIL_SCHEMA} from "@/modules/notification/http/schemas/sendmail-schema";
import axios from "axios";
import * as process from "node:process";

const MAILER_HOST = process.env.MAILER_HOST || 'http://localhost';
const MAILER_PORT = process.env.MAILER_PORT || 30123;

const api = axios.create({
    baseURL: `${MAILER_HOST}:${MAILER_PORT}`,
})

export async function send_email(options: Record<string, any>): Promise<void> {
    await api.post("/send-mail", SENDMAIL_SCHEMA.parse(options));
}