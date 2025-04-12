import {SENDMAIL_SCHEMA} from "@/modules/notification/http/schemas/sendmail-schema";
import axios from "axios";
import {get_env} from "@/shared/application/helpers/get-env";

const MAILER_HOST = get_env('MAILER_HOST', 'https://util.devi.tools/api/v1');
const MAILER_PORT = get_env('MAILER_PORT', 8080);

const api = axios.create({
    baseURL: `${MAILER_HOST}:${MAILER_PORT}`,
})

export async function send_email(options: Record<string, any>): Promise<void> {
    await api.post("/notify", SENDMAIL_SCHEMA.parse(options));
}