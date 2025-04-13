import {z} from "zod";

export const TRANSFER_REQUEST_SCHEMA = z.object({
    recipient_id: z.string(),
    amount: z.number().positive(),
});

export type TransferBody = z.infer<typeof TRANSFER_REQUEST_SCHEMA>