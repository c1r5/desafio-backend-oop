import {z} from "zod";
import {validate_cpf} from "@/shared/application/helpers/cpf";
import {validate_cnpj} from "@/shared/application/helpers/cnpj";

export const userCreateResponseSchema = z.object({
    user_id: z.string().optional(),
    message: z.string()
});

export type UserCreateResponse = z.infer<typeof userCreateResponseSchema>

export const userCreateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    document: z.string().refine(s => {
        return validate_cpf(s) || validate_cnpj(s)
    }, 'invalid_document'),
    phone: z.string(),
    password: z.string(),
    type: z.string().optional()
});

export type UserCreateBody = z.infer<typeof userCreateBodySchema>