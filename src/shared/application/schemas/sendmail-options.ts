import { z } from "zod";

export const SENDMAIL_OPTIONS = z.object({
    from: z.string().email().default("nao_responda@testepay.com").optional(),
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
});

export type SendmailOptions = z.infer<typeof SENDMAIL_OPTIONS>;