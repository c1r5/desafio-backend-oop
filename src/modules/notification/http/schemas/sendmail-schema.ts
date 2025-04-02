import {z} from "zod";

export const SENDMAIL_SCHEMA = z.object({
    from: z.string().email().optional().default("nao_responda@testepay.com"),
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
});

export type SendmailSchema = z.infer<typeof SENDMAIL_SCHEMA>;