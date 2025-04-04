import { z } from "zod";
import { CPF } from "../../domain/values/cpf";
import { CNPJ } from "../../domain/values/cnpj";

export const USER_CREATE_RESPONSE_SCHEMA = z.object({
    user_id: z.string().optional(),
    message: z.string()
});

export type UserCreateResponse = z.infer<typeof USER_CREATE_RESPONSE_SCHEMA>

export const USER_CREATE_REQUEST_SCHEMA = z.object({
    name: z.string(),
    email: z.string().email(),
    document: z.string().refine(s => {
        return CPF.is_valid(s) || CNPJ.is_valid(s);
    }, 'invalid_document'),
    phone: z.string(),
    password: z.string()
});

export type UserCreateRequest = z.infer<typeof USER_CREATE_REQUEST_SCHEMA>