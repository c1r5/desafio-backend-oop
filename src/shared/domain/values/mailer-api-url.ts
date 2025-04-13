import { get_env } from "@/shared/application/helpers/get-env";

export const API_URL = String(get_env("ENVIRONMENT") === "production" ? get_env("MAILER_API_URL") : get_env("MOCK_MAILER_API_URL"))