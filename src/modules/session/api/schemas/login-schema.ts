import { CNPJ } from "@/modules/users/domain/values/cnpj";
import { CPF } from "@/modules/users/domain/values/cpf";
import { z } from "zod";


export const LOGIN_REQUEST_SCHEMA = z.object({
    document: z.string().refine(s => CPF.is_valid(s) || CNPJ.is_valid(s), {
        message: 'É necessário fornecer um documento válido.',
        path: ['document'],
    }).optional(),
    email: z.string().email('Email inválido').optional(),
    password: z.string().min(8, 'Senha é no minimo 8 caractéres')
}).refine(data => data.document || data.email, {
    message: 'É necessário fornecer um e-mail ou um documento.',
    path: ['document', 'email']
});

export type LoginRequest = z.infer<typeof LOGIN_REQUEST_SCHEMA>