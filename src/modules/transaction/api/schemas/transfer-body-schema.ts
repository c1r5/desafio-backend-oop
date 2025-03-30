import {z} from "zod";

export const transfer_body_schema = z.object({
    recipient_id: z.string(),
    amount: z.string()
});

export type TransferBody = z.infer<typeof transfer_body_schema>