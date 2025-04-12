import { z } from "zod";

export const SENDMAIL_OPTIONS = z.object({
    from: z.string().email().optional().default("nao_responda@testepay.com"),
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
});

export type SendmailOptions = z.infer<typeof SENDMAIL_OPTIONS>;