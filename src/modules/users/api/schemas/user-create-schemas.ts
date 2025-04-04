import { z } from "zod";
import { validate_cpf } from "@/shared/application/helpers/cpf-helper";
import { validate_cnpj } from "@/shared/application/helpers/cnpj-helper";

export const USER_CREATE_RESPONSE_SCHEMA = z.object({
    user_id: z.string().optional(),
    message: z.string()
});

export type UserCreateResponse = z.infer<typeof USER_CREATE_RESPONSE_SCHEMA>

export const USER_CREATE_REQUEST_SCHEMA = z.object({
    name: z.string(),
    email: z.string().email(),
    document: z.string().refine(s => {
        return validate_cpf(s) || validate_cnpj(s)
    }, 'invalid_document'),
    phone: z.string(),
    password: z.string()
});

export type UserCreateRequest = z.infer<typeof USER_CREATE_REQUEST_SCHEMA>